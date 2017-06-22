angular.module('app.controllers', [])

    .controller('testCtrl', function ($rootScope, $scope, $state, $cookieStore, AlertService, TestService) {
        let promise = TestService.getalltodo();
        promise.then(function (data) {
            console.log(data);
            $scope.todos = data;
        }, function (data) {
            AlertService.error(data);
        }).catch(function (err) {
            console.log(err);
        });

        $scope.add = function () {
            AlertService.input('添加', '添加一个todo', function (inputValue) {
                if (!inputValue) {
                    AlertService.error('不能为空!');
                    return;
                }
                let promise = TestService.add(inputValue);
                promise.then(function (data) {
                    console.log(data);
                    $scope.todos.push(data);
                    AlertService.success();
                }, function (data) {
                    AlertService.error(data);
                }).catch(function (err) {
                    console.log(err);
                });
            });
        };

        $scope.delete = function (item) {
            AlertService.warning('删除', '删除此条', function () {
                let promise = TestService.delete(item.id);
                promise.then(function (data) {
                    console.log(data);

                    let promise = TestService.getalltodo();
                    promise.then(function (data) {
                        // console.log(data);
                        $scope.todos = data;
                    }, function (data) {
                        AlertService.error(data);
                    }).catch(function (err) {
                        console.log(err);
                    });

                    AlertService.success();
                }, function (data) {
                    AlertService.error(data);
                }).catch(function (err) {
                    console.log(err);
                });
            })
        };

        $scope.update = function (item) {
            let promise = TestService.update(item);
            promise.then(function (data) {
                // console.log(data);
                // $scope.todos = data;
            }, function (data) {
                AlertService.error(data);
            }).catch(function (err) {
                console.log(err);
            });
        }
    })

    //-------------------------------------- 主页 登录 注册 home login register----------------------------------------
    .controller('homeCtrl', function ($rootScope, $scope, $state, $cookieStore) {
        $cookieStore.put('currentState', 'home');
    })

;