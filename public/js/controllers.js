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

    .controller('homeCtrl', function ($rootScope, $scope, $state, $cookieStore) {
        $cookieStore.put('currentState', 'home');
    })

    .controller('bookingCtrl', function ($rootScope, $scope, $state, $cookieStore) {
        //option1234对应四个选项的class是否为true
        $scope.option = [
            {opt: 1, cls: 1},
            {opt: 2, cls: 0},
            {opt: 3, cls: 0},
            {opt: 4, cls: 0},
        ];
        $scope.changeOption = function (item) {
            for (let i of $scope.option) {
                i.cls = 0;
            }
            $scope.option[item.opt - 1].cls = 1;
            // console.log($scope.option);
            $state.go('booking.step' + item.opt);
        }
    })

    .controller('step1Ctrl', function ($rootScope, $scope, $state, $cookieStore) {
        $scope.datetime = {
            date: new Date(),
            time: new Date().toLocaleTimeString()
        };
        $('#datepicker').datetimepicker({
            format: 'yyyy-mm-dd',
            language: 'en',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
        $('#timepicker').wickedpicker();
        $scope.continue = function () {
            let date = $('#datepicker').val();
            if (!date) date = new Date().Format("yyyy-MM-dd");
            let time = $('#timepicker').val();
            console.log(date);
            console.log(time);
        };
    })

    .controller('step2Ctrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('step3Ctrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('step4Ctrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('therapistCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('stylesCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('pricingCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('faqCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('contactusCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('signinCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

;