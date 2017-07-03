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
            },

            post: function (url, param = null, successcb = null, errorcb = null) {

                const deferred = $q.defer();

                $http.post(this.getHostIP() + url, param)
                    .then(function (restResult, status, headers, config) {
                        console.log(restResult);
                        let data = restResult.data;
                        if (data.code === 0) {
                            if (successcb) successcb();
                            deferred.resolve(data.returnValue);
                        } else {
                            if (errorcb) errorcb();
                            deferred.reject(data.errorReason);
                        }
                    })
                    .catch(function (restResult, status, headers, config) {
                        deferred.reject(restResult.data.errorReason);
                    });
                return deferred.promise;
            }
        }
    })

    .service('TestService', function ($q, $http, SystemService) {
        this.getalltodo = function (user) {

            let promise = SystemService.post('web/test/getalltodo');
            return promise;

        };

        this.add = function (content) {
            let param = {
                content: content
            };
            return SystemService.post('web/test/add', param);
        };

        this.delete = function (id) {
            // console.log(id)
            let param = {
                id: id
            };
            return SystemService.post('web/test/delete', param);
        };

        this.update = function (item) {
            let param = {
                id: item.id,
                content: item.content
            };
            return SystemService.post('web/test/update', param);
        }
    })

    .service('AlertService', function () {
        this.success = function (message) {
            swal('成功!', message, 'success');
        };
        this.error = function (message) {
            swal('出错了!', message, 'error');
        };
        this.warning = function (title, message, callback) {
            swal({
                title: title,
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then(callback, function (dismiss) {
                if (dismiss === 'cancel') {
                    // ignore
                } else {
                    console.log(dismiss);
                }
            });
        };
        this.question = function (title, message, callback) {
            swal({
                title: title,
                text: message,
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then(callback, function (dismiss) { //callback是确定的会掉，后面是其他的回调
                if (dismiss === 'cancel') {
                    // ignore
                } else {
                    console.log(dismiss);
                }
            });
        };
        this.input = function (title, message, callback) {
            swal({
                title: title,
                text: message,
                type: 'info',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function (inputValue) {
                callback(inputValue);
            }, function (dismiss) {
                if (dismiss === 'cancel') {
                    // ignore
                } else {
                    console.log(dismiss);
                }
            });
        };

    })

    .service('UserService', function ($q, $http, SystemService) {
        this.register = function (content) {
            let param = {
                firstName: content.firstName,
                lastName: content.lastName,
                emailAddress: content.emailAddress,
                mobileNumber: content.mobileNumber,
                password: content.password
            };
            console.log(param);
            return SystemService.post('web/user/register', param);
        };
        this.login = function (content) {
            let param = {
                emailAddress: content.emailAddress,
                password: content.password
            };
            console.log(param);
            return SystemService.post('web/user/login', param);
        };
    })

    .service('BookingService', function ($q, $http, SystemService) {
        this.booking = function (content) {
            let param = {
                userId:content.userId,
                therapists:content.therapists,
                date:content.date,
                time:content.time,
                style:content.style,
                massageLength:content.massageLength,
                address:content.address,
                creditCardNumber:content.creditCardNumber,
            };
            return SystemService.post('web/booking/booking', param);
        }

    })

;