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

    .controller('homeCtrl', function ($rootScope, $scope, $state, $cookieStore, $http) {
        $cookieStore.put('currentState', 'home');
        $http.get('../data/faq.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.items = resdata.data;
            });
        $http.get('../data/home-massage-type.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.datas = resdata.data;
            })
    })

    .controller('bookingCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout) {

        //延迟0表示加到任务队列末尾，确保渲染完页面才执行，防止得到上一个url而出错
        $timeout(function () {
            // console.log(document.URL);
            // console.log(document.getCurrentState());
            let active = document.URL.substr(document.URL.length - 1, 1); //获取url最后一个数字，就是step1234中的一个
            // console.log(active);
            //option1234对应四个选项的class是否为true
            $scope.option = [
                {opt: 1, cls: 0},
                {opt: 2, cls: 0},
                {opt: 3, cls: 0},
                {opt: 4, cls: 0},
            ];
            $scope.option[active - 1].cls = 1;

        }, 0);

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

    .controller('step2Ctrl', function ($rootScope, $scope, $state, $cookieStore, $http) {
        $http.get('../data/bookingstep2.json')
            .then(function (resdata) {
                // console.log(resdata);
                $scope.chooses = resdata.data;
                for (let i = 0; i < $scope.chooses.length; i++) {
                    $scope.chooses[i].chooseoption = $scope.chooses[i].options[0];
                }
            });
        $http.get('../data/massage-therapists.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.therapists = resdata.data;
            });
        $scope.changeChoose = function (choose, option) {
            choose.chooseoption = option;
            // console.log(choose);
            // console.log(option);
        };
        $scope.continue = function () {
            let choise = [];
            for (let i = 0; i < $scope.chooses.length; i++) {
                let item = {
                    type:$scope.chooses[i].type,
                    option:$scope.chooses[i].chooseoption,
                };
                choise.push(item);
            }
            console.log(choise);
        }
    })

    .controller('step3Ctrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('step4Ctrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('therapistCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('stylesCtrl', function ($rootScope, $scope, $state, $cookieStore, $http) {
        $http.get('../data/type.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.datas = resdata.data;
            })
    })

    .controller('pricingCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('faqCtrl', function ($rootScope, $scope, $state, $cookieStore, $http) {
        $http.get('../data/faq.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.items = resdata.data;
            })
    })

    .controller('contactusCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

    .controller('signinCtrl', function ($rootScope, $scope, $state, $cookieStore) {

    })

;