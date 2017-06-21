angular.module('app.services', [])

    .factory('SystemService', function ($q, $http, hostip) {
        let user = null;
        let uid = null;
        let loginToken = null;
        return {
            hasCode: function () {
                if (user) {
                    return user.code;
                } else {
                    return null;
                }
            },
            getUser: function () {
                let userCache = null;

                if (!sessionStorage.user) {
                    userCache = null;
                }
                else {
                    userCache = JSON.parse(sessionStorage.user);
                }

                //判断是否存在用户缓存
                if (user && userCache) {
                    //判断本地缓存和session或者localstorage里面的用户信息是否相同
                    if (user._id !== userCache._id) {
                        user = userCache;
                    }
                } else if (!user && userCache) {
                    user = userCache;
                }
                return user;
            },
            setUser: function (newUser) {
                user = newUser;
                sessionStorage.user = JSON.stringify(newUser);
            },

            getUID: function () {
                if (!user) {
                    user = JSON.parse(localStorage.user);
                }
                return user._id;
            },
            setUID: function (newUID) {
                uid = newUID;
                sessionStorage.uid = newUID;
            },
            getHostIP: function () {
                // return window.location.protocol + '//' + window.location.host;
                return hostip;
            },
            getLoginToken: function () {
                if (!loginToken) {
                    loginToken = sessionStorage.loginToken;
                }
                return loginToken;
            },
            setLoginToken: function (newLoginToken) {
                loginToken = newLoginToken;
                sessionStorage.loginToken = loginToken;
            }
        }
    })

    .service('UserService', function ($q, $http, SystemService) {
        this.login = function (user) {
            // console.log('service');
            // console.log(user);
            const deferred = $q.defer();
            const param = {
                user: user,
            };
            $http.post(SystemService.getHostIP() + 'web/user/login', param)
                .then(function (restResult, status, headers, config) {
                    console.log(restResult);
                    let data = restResult.data;
                    if (data.code == 0) {
                        console.log('login!')
                        let user = data.returnValue.user;
                        localStorage.user = JSON.stringify(data.returnValue.user);
                        SystemService.setUser(data.returnValue.user);
                        let loginToken = data.returnValue.loginToken;
                        localStorage.loginToken = data.returnValue.loginToken;

                        SystemService.setLoginToken(data.returnValue.loginToken);
                        let uid = data.returnValue.user._id;
                        localStorage.uid = data.returnValue.user._id;
                        SystemService.setUID(data.returnValue.user._id);

                        deferred.resolve(data.returnValue);
                    } else {
                        console.log('loginErr!')
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };

        this.logout = function () {
            // console.log('service');
            // console.log(user);

            console.log('logout!');
            let user = null;
            localStorage.user = JSON.stringify(user);
            SystemService.setUser(user);
            let loginToken = null;
            localStorage.loginToken = loginToken;

            SystemService.setLoginToken(loginToken);
            let uid = null;
            localStorage.uid = uid;
            SystemService.setUID(uid);
        };

        this.register = function (user) {
            // console.log(user);
            const deferred = $q.defer();
            const param = {
                user: user
            };
            $http.post(SystemService.getHostIP() + 'web/user/register', param)
                .then(function (restResult, status, headers, config) {
                    console.log(restResult);
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        console.log(data.returnValue);

                        let user = data.returnValue.user;
                        localStorage.user = JSON.stringify(data.returnValue.user);
                        SystemService.setUser(data.returnValue.user);
                        let loginToken = data.returnValue.loginToken;
                        localStorage.loginToken = data.returnValue.loginToken;

                        SystemService.setLoginToken(data.returnValue.loginToken);
                        let uid = data.returnValue.user._id;
                        localStorage.uid = data.returnValue.user._id;
                        SystemService.setUID(data.returnValue.user._id);

                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };

        this.resetPwd = function (studentID, email) {
            // console.log('service');
            // console.log(user);
            const deferred = $q.defer();
            const param = {
                studentID: studentID,
                email: email
            };
            // console.log(SystemService.getHostIP());
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/resetPwd', param)
                .then(function (restResult, status, headers, config) {
                    console.log(restResult);
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        console.log(data.returnValue);
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.getLatestInformation = function (userId) {
            const deferred = $q.defer();
            const param = {
                userId: userId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/getLatestInformation', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;

        };
        this.showAllUser = function () {
            const deferred = $q.defer();
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/showAllUser')
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.editUser = function (user) {
            const deferred = $q.defer();
            const param = {
                user: user,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/editUser', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };

    })

;