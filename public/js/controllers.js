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
    .controller('navbarCtrl', function ($document, $scope, $state, $cookieStore, $http, $timeout) {
        console.log("test");
        $scope.closeMenu = function () {
            $(".rightSlideMenu").css('display', 'none');
        };
        $scope.openMenu = function () {
            $(".rightSlideMenu").css('display', 'block');
        };
        $timeout(function () {
            console.log($(".rightSlideMenu .filter"));
            $(".rightSlideMenu .filter").bind('click', function () {
                    $(".rightSlideMenu").css('display', 'none');
                }
            )
        }, 0);


    })
    .controller('homeCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
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
            });
        $http.get('../data/price.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.prices = resdata.data[0].priceList;

            });


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

        $timeout(function () {
            document.navInit(0)
        }, 0);
    })

    .controller('bookingCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout) {

        //延迟0表示加到任务队列末尾，确保渲染完页面才执行，防止得到上一个url而出错
        $timeout(function () {
            // console.log(document.URL);
            // console.log(document.getCurrentState());
            let active = document.URL.substr(document.URL.length - 1, 1); //获取url最后一个数字，就是step1234中的一个
            // console.log(active);
            // bookingStepOption1234对应四个选项的class是否为true
            // 为了解决同二级路由跳转状态不改变的已放进$rootScope
            // $scope.bookingStepOption = [
            //     {opt: 1, cls: 0},
            //     {opt: 2, cls: 0},
            //     {opt: 3, cls: 0},
            //     {opt: 4, cls: 0},
            // ];
            $scope.bookingStepOption[active - 1].cls = 1;
            document.navInit(1);
        }, 0);

        $scope.changeOption = function (item) {
            for (let i of $scope.bookingStepOption) {
                i.cls = 0;
            }
            $scope.bookingStepOption[item.opt - 1].cls = 1;
            // console.log($scope.bookingStepOption);
            $state.go('booking.step' + item.opt);
        }
    })

    .controller('step1Ctrl', function ($rootScope, $scope, $state, $cookieStore) {
        $scope.setCurrentBookingStep(1);

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
            let step1 = {
                date: date,
                time: time
            };
            $cookieStore.put('step1', step1);
            $state.go('booking.step2');
        };
    })

    .controller('step2Ctrl', function ($rootScope, $scope, $state, $cookieStore, $http, AlertService) {
        $scope.setCurrentBookingStep(2);

        $scope.chooses = [];
        $scope.therapists = [];
        $scope.chooseTherapist = [];

        //count是当前已选的计数，$scope.count是选项中的人数
        let count = $scope.count = 0;

        $http.get('../data/bookingstep2.json')
            .then(function (resdata) {
                // console.log(resdata);
                $scope.chooses = resdata.data;

                //每个选项的默认选项是第一个
                for (let i = 0; i < $scope.chooses.length; i++) {
                    $scope.chooses[i].chooseoption = $scope.chooses[i].options[0];
                }

                //选中的人数是第一个选择的内容
                let str = $scope.chooses[0].chooseoption;
                //选中'-'后面的数字
                $scope.count = str.substr(str.indexOf('-') + 1, 1);
            });

        $scope.changeChoose = function (choose, option) {
            choose.chooseoption = option;

            //每次修改第一个的选项后重置下面人物选择部分内容
            if (choose === $scope.chooses[0]) {
                count = 0;
                let str = $scope.chooses[0].chooseoption;
                $scope.count = str.substr(str.indexOf('-') + 1, 1);
                $scope.chooseTherapist = [];
                for (let i = 0; i < $scope.therapists.length; i++) {
                    angular.element('#' + $scope.therapists[i].name).removeClass('img-active');
                }
            }
        };

        $http.get('../data/massage-therapists.json')
            .then(function (resdata) {
                // console.log(resdata);
                $scope.therapists = resdata.data;
            });

        $scope.toggleTherapist = function (therapist) {
            let flag = 0;
            //以下代码吧这个元素从数组中删除，并不改变原顺序。复杂度O(n^2)
            //找到该元素，并把后面元素依次往前移动，最后pop掉最后元素
            for (let i = 0; i < $scope.chooseTherapist.length; i++) {
                if (therapist === $scope.chooseTherapist[i]) {
                    flag = 1;
                    count--;
                    for (let j = i; j < $scope.chooseTherapist.length - 1; j++) {
                        $scope.chooseTherapist[j] = $scope.chooseTherapist[j + 1];
                    }
                    $scope.chooseTherapist.pop();
                    break;
                }
            }
            if (!flag) {
                count++;
                // console.log(count);
                // console.log($scope.count);
                // console.log(count > $scope.count);
                if (count > $scope.count) {
                    AlertService.error('人数已满！');
                    count--;
                    return;
                }
                $scope.chooseTherapist.push(therapist);
            }
            angular.element('#' + therapist.name).toggleClass('img-active');
        };

        $scope.continue = function () {
            //一个是string一个是number,+string是吧string转为number
            if (count !== +$scope.count) {
                AlertService.error('请选择Therapist！');
                return;
            }
            let choise = [];
            for (let i = 0; i < $scope.chooses.length; i++) {
                let item = {
                    type: $scope.chooses[i].type,
                    option: $scope.chooses[i].chooseoption,
                };
                choise.push(item);
            }
            choise.push({
                type: 'chooseTherapist',
                option: $scope.chooseTherapist
            });
            console.log(choise);
            $cookieStore.put('step2', choise);
            $state.go('booking.step3');
        };

        $scope.back = function () {
            $state.go('booking.step1');
        };
    })

    .controller('step3Ctrl', function ($rootScope, $scope, $state, $cookieStore) {
        $scope.setCurrentBookingStep(3);

        $scope.continue = function () {
            let step3;
            if ($scope.showType === 0) {
                step3 = {
                    showType: 0,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    emailAddress: $scope.emailAddress,
                    mobileNumber: $scope.mobileNumber,
                    passWord: $scope.password
                }

            }
            else {
                step3 = {
                    showType: 1,
                    emailAddress: $scope.emailAddress,
                    passWord: $scope.password
                }
            }
            $cookieStore.put('step3', step3);
            $state.go('booking.step4');
        };

        $scope.back = function () {
            $state.go('booking.step2');
        };
    })

    .controller('step4Ctrl', function ($rootScope, $scope, $state, $cookieStore, BookingService, AlertService) {
        $scope.setCurrentBookingStep(4);

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

        $scope.apply = function () {
            console.log('apply')
        };

        $scope.book = function () {
            let step4 = {};
            if ($scope.step4 === 0) {
                step4 = {
                    streetAddress: $scope.streetAddress,
                    streetAddress2: $scope.streetAddress2,
                    stateProvince: $scope.stateProvince,
                    postCode: $scope.postCode,
                    parkingInstructions: $scope.parkingInstructions
                };
                $scope.step4 = 1;
                return;
            }
            step4.cardName = $scope.cardName;
            step4.cardNumber = $scope.cardNumber;
            step4.cardExpirationDate = $scope.cardExpirationDate;
            step4.cardSecurityCode = $scope.cardSecurityCode;
            step4.billingPostalCode = $scope.billingPostalCode;
            step4.giftCode = $scope.giftCode;

            let promise = BookingService.booking();
            promise.then(function (data) {
                AlertService.success('提交订单成功！');
            }, function (data) {
                AlertService.error(data);
            }).catch(function (err) {
                console.log(err);
            });
        };

        $scope.back = function () {
            if ($scope.step4 === 1) {
                $scope.step4 = 0;
                return;
            }
            $state.go('booking.step3');
        };
    })

    .controller('therapistCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        $http.get('../data/massage-therapists.json')
            .then(function (resdata) {
                // console.log(resdata.data);
                $scope.chooses = resdata.data;

            });
        $timeout(function () {
            document.navInit(2)
        }, 0);

    })

    .controller('stylesCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        $http.get('../data/home-massage-type.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.datas = resdata.data;
            })
        $timeout(function () {
            document.navInit(3)
        }, 0);
    })

    .controller('pricingCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        $http.get('../data/price.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.prices1 = resdata.data[0].priceList;
                $scope.prices2 = resdata.data[1].priceList;

            });
        $timeout(function () {
            document.navInit(4)
        }, 0);


    })

    .controller('faqCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        $http.get('../data/faq.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.items = resdata.data;
            })
        $timeout(function () {
            document.navInit(5)
        }, 0);

    })

    .controller('contactusCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout) {
        $timeout(function () {
            document.navInit(6)
        }, 0);

    })

    .controller('signinCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout) {
        $timeout(function () {
            document.navInit(7)
        }, 0);
    })

;