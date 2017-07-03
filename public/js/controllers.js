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
            console.log("test");
            $(".menu").animate({right: '-100%'}, 300, function () {

                $(".filter").animate({opacity: '0'}, 300, function () {
                    $(".rightSlideMenu").css('display', 'none');
                    $("body").css({
                        overflow: "scroll"
                    });
                    $(".filter").css('opacity', '0.6');
                    $(".menu").css('right', '0');

                });
            });
        };
        $scope.openMenu = function () {
            $(".rightSlideMenu").css('display', 'block');
            $("body").css({
                overflow: "hidden"
            });
        };
        $timeout(function () {
            console.log($(".rightSlideMenu .filter"));
            $(".rightSlideMenu .filter").bind('click', function () {
                    $scope.closeMenu();
                }
            )
        }, 0);


    })
    .controller('homeCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {

        $('#myCarousel').carousel({interval: 3500});//每隔5秒自动轮播

        //TODO 逻辑二选一
        // $http.get('../data/faq.json')
        //     .then(function (resdata) {
        //         console.log(resdata);
        //         $scope.items = resdata.data;
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/faq')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.items = data.returnValue;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });
        //TODO 逻辑二选一
        // $http.get('../data/home-massage-type.json')
        //     .then(function (resdata) {
        //         console.log(resdata);
        //         $scope.datas = resdata.data;
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/home-massage-type')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.datas = data.returnValue;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });
        //TODO 逻辑二选一
        // $http.get('../data/price.json')
        //     .then(function (resdata) {
        //         console.log(resdata);
        //         $scope.prices = resdata.data[0].priceList;
        //
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/price')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.prices = data.returnValue[0].priceList;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
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

        $scope.booking = function () {
            let date = $('#datepicker').val();
            if (!date) date = new Date().Format("yyyy-MM-dd");
            let time = $('#timepicker').val();
            console.log(date);
            console.log(time);
            console.log(time.length);
            let step1 = {
                date: date,
                time: time
            };
            $cookieStore.put('step1', step1);
            $state.go('booking.step2');
        };


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

    .controller('step1Ctrl', function ($rootScope, $scope, $state, $cookieStore, $timeout) {
        $scope.setCurrentBookingStep(1);

        //页面渲染完后设置min-height让step1的footer贴底
        $timeout(function () {
            console.log($(document.body).height());
            console.log($('.content').offset().top);
            console.log($('.footer').height());
            let minHeight = $(document.body).height() - ($('.footer').height() + $('.content').offset().top);
            $('.content').css('min-height', minHeight);
        }, 0);

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
            console.log(time.length);
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
        //TODO 逻辑三选一
        // $http.get('../data/bookingstep2.json')
        //     .then(function (resdata) {
        //         // console.log(resdata);
        //         $scope.chooses = resdata.data;
        //
        //         //每个选项的默认选项是第一个
        //         for (let i = 0; i < $scope.chooses.length; i++) {
        //             $scope.chooses[i].chooseoption = $scope.chooses[i].options[0];
        //         }
        //
        //         //选中的人数是第一个选择的内容
        //         let str = $scope.chooses[0].chooseoption;
        //         //选中'-'后面的数字
        //         $scope.count = str.substr(str.indexOf('-') + 1, 1);
        //     });
        // $http.post('http://localhost:4000/web/FrontEndData/bookingstep2')
        //     .then(function (restResult, status, headers, config) {
        //         let data = restResult.data;
        //         if (data.code == 0) {
        //             $scope.chooses = data.returnValue;
        //
        //             //每个选项的默认选项是第一个
        //             for (let i = 0; i < $scope.chooses.length; i++) {
        //                 $scope.chooses[i].chooseoption = $scope.chooses[i].options[0];
        //             }
        //
        //             //选中的人数是第一个选择的内容
        //             let str = $scope.chooses[0].chooseoption;
        //             //选中'-'后面的数字
        //             $scope.count = str.substr(str.indexOf('-') + 1, 1);
        //
        //         } else {
        //             console.log(data.errorReason);
        //         }
        //     })
        //     .catch(function (restResult, status, headers, config) {
        //         console.log(restResult.data.errorReason);
        //     });

        let price, massageType;
        $http.post('http://localhost:4000/web/FrontEndData/bookingstep2')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.chooses = data.returnValue;


                    $http.post('http://localhost:4000/web/FrontEndData/price')
                        .then(function (restResult) {
                            price = restResult.data.returnValue;

                            $http.post('http://localhost:4000/web/FrontEndData/home-massage-type')
                                .then(function (restResult) {
                                    massageType = restResult.data.returnValue;

                                    $scope.chooses[0].options = [];
                                    $scope.chooses[1].options = [];
                                    $scope.chooses[2].options = [];
                                    for (let i = 0; i < price.length; i++) {
                                        $scope.chooses[0].options.push(price[i].title);
                                    }
                                    for (let i = 0; i < price[0].priceList.length; i++) {
                                        $scope.chooses[1].options.push(price[0].priceList[i].time + " minutes - £" + price[0].priceList[i].price);
                                    }
                                    for (let i = 0; i < massageType.length; i++) {
                                        let str = massageType[i].title;
                                        if (str.indexOf("Massage") < 0) {
                                            str += " Massage";
                                        }
                                        $scope.chooses[2].options.push(str);
                                    }

                                    //每个选项的默认选项是第一个
                                    for (let i = 0; i < $scope.chooses.length; i++) {
                                        $scope.chooses[i].chooseoption = $scope.chooses[i].options[0];
                                    }

                                    //选中的人数是第一个选择的内容
                                    let str = $scope.chooses[0].chooseoption;
                                    //选中'-'后面的数字
                                    $scope.count = str.substr(str.indexOf('-') + 1, 1);


                                })
                                .catch(function (restResult, status, headers, config) {
                                    console.log(restResult.data.errorReason);
                                });

                        })
                        .catch(function (restResult, status, headers, config) {
                            console.log(restResult.data.errorReason);
                        });
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });

        $scope.changeChoose = function (choose, option) {
            choose.chooseoption = option;

            //TODO 逻辑二选一随上面选择而变，若上面为1、2，则为1，上面为3则为2
            //每次修改第一个的选项后重置下面人物选择部分内容
            // if (choose === $scope.chooses[0]) {
            //     count = 0;
            //     let str = $scope.chooses[0].chooseoption;
            //     $scope.count = str.substr(str.indexOf('-') + 1, 1);
            //     $scope.chooseTherapist = [];
            //     for (let i = 0; i < $scope.therapists.length; i++) {
            //         angular.element('#' + $scope.therapists[i].name).removeClass('img-active');
            //     }
            // }
            //每次修改第一个的选项后重置下面人物选择部分内容并修改第二个选项的价格
            if (choose === $scope.chooses[0]) {
                count = 0;
                let str = $scope.chooses[0].chooseoption;
                $scope.count = str.substr(str.indexOf('-') + 1, 1);
                $scope.chooseTherapist = [];
                for (let i = 0; i < $scope.therapists.length; i++) {
                    angular.element('#' + $scope.therapists[i].name).removeClass('img-active');
                }

                $scope.chooses[1].options = [];
                let priceList = price[$scope.count - 1].priceList;
                for (let i = 0; i < priceList.length; i++) {
                    $scope.chooses[1].options.push(priceList[i].time + " minutes - £" + priceList[i].price);
                }
                //默认选项是第一个
                $scope.chooses[1].chooseoption = $scope.chooses[1].options[0];

            }
        };
        //TODO 逻辑二选一
        // $http.get('../data/massage-therapists.json')
        //     .then(function (resdata) {
        //         // console.log(resdata);
        //         $scope.therapists = resdata.data;
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/massage-therapists')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.therapists = data.returnValue;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
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
            console.log(count);
            console.log($scope.count);
            if (count !== +$scope.count) {
                AlertService.question('未选择Therapist', '任意Therapist?',
                    function () {
                        $scope.chooseTherapist = [{
                            name: 'Either Therapist'
                        }];
                        nextstep();
                    });
            }else{
                nextstep();
            }
        };

        function nextstep() {
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
        }

        $scope.back = function () {
            $state.go('booking.step1');
        };
    })

    .controller('step3Ctrl', function ($rootScope, $scope, $state, $cookieStore, BookingService, UserService, AlertService) {
        $scope.setCurrentBookingStep(3);
        if ($cookieStore.get('currentAccount')) {
            AlertService.success("您已登陆!");
            $state.go('booking.step4');
        }
        $scope.forgetPwd = function () {
            $state.go('forgetpassword');
        };
        $scope.continue = function () {
            let step3, flag = 1;
            if ($scope.showType === 0) {
                step3 = {
                    showType: 0,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    emailAddress: $scope.emailAddress,
                    mobileNumber: $scope.mobileNumber,
                    password: $scope.password
                }

            }
            else {
                step3 = {
                    showType: 1,
                    emailAddress: $scope.emailAddress,
                    password: $scope.password
                }
            }

            $cookieStore.put('step3', step3);
            if (step3.showType === 0) {
                let promise = UserService.register(step3);
                promise.then(function (data) {
                    console.log(data);
                    AlertService.success("注册成功!");
                    console.log(data);
                    $cookieStore.put('currentAccount', data.id);
                    $state.go('booking.step4');
                }, function (reason) {
                    console.log(reason);
                    flag = 0;
                    AlertService.error(reason);
                })
            }
            else {
                let promise = UserService.login(step3);
                promise.then(function (data) {
                    console.log(data);
                    AlertService.success("登录成功!");
                    console.log(data);
                    $cookieStore.put('currentAccount', data.id);
                    $state.go('booking.step4');
                }, function (reason) {
                    console.log(reason);
                    flag = 0;
                    AlertService.error(reason);
                })
            }
            console.log(step3.showType);
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
            if ($scope.cardName
                && $scope.cardNumber
                && $scope.cardExpirationDate
                && $scope.cardSecurityCode
                && $scope.billingPostalCode) {
                AlertService.success('验证成功!');
            } else {
                AlertService.error('请填写前面的内容!');
            }
        };

        let step4 = {};
        $scope.book = function () {
            if ($scope.step4 === 0) {
                step4 = {
                    streetAddress: $scope.streetAddress,
                    streetAddress2: $scope.streetAddress2,
                    stateProvince: $scope.stateProvince,
                    postCode: $scope.postCode,
                    parkingInstructions: $scope.parkingInstructions || ''  //如果是undefined就改为空字符串
                };
                $scope.step4 = 1;


                $scope.showOrderSummary = false;
                let step1 = $cookieStore.get('step1');
                let step2 = $cookieStore.get('step2');
                let step3 = $cookieStore.get('step3');
                console.log('step1');
                console.log(step1);
                console.log('step2');
                console.log(step2);
                console.log('step3');
                console.log(step3);
                console.log('step4');
                console.log(step4);
                let date = step1.date.split('-').reverse();
                [date[0], date[1]] = [date[1], date[0]];
                let datetime = date.join('/') + ' ' + step1.time.replace(' : ', ':');
                console.log(datetime);

                let session = step2[0].option.substring(0, step2[0].option.indexOf('-') - 1);
                console.log(session);

                let therapist = step2[3].option[0].name;
                for (let i = 1; i < step2[3].option.length; i++) {
                    therapist += ',' + step2[3].option[i].name;
                }
                let detail = step2[2].option.substring(0, step2[2].option.indexOf('Massage') - 1) + '/' +
                    step2[1].option.substring(0, step2[1].option.indexOf(' ') + 4) + '/' + therapist;
                console.log(detail);

                let address = step4.streetAddress.length > 10 ? step4.streetAddress.substr(0, 10) + '...' : step4.streetAddress + ', ' + step4.postCode;
                console.log(address);

                let money = step2[1].option.substring(step2[1].option.indexOf('-') + 3, step2[1].option.length);
                console.log(money);

                if (step1 && step2) {
                    $scope.orderSummary = {
                        datetime: datetime,
                        session: session + ' Session',
                        detail: detail,
                        address: address,
                        money: money
                    };
                    $scope.showOrderSummary = true;
                }


                return;
            }
            step4.cardName = $scope.cardName;
            step4.cardNumber = $scope.cardNumber;
            step4.cardExpirationDate = $scope.cardExpirationDate;
            step4.cardSecurityCode = $scope.cardSecurityCode;
            step4.billingPostalCode = $scope.billingPostalCode;
            step4.giftCode = $scope.giftCode;

            $cookieStore.put('step4', step4);

            let step1 = $cookieStore.get('step1');
            let step2 = $cookieStore.get('step2');
            let step3 = $cookieStore.get('currentAccount');
            if (!(step1 && step2 && step3 && step4)) {
                AlertService.error('请完成前面步骤！');
                return;
            }

            let data = {
                userId: $cookieStore.get('currentAccount'),
                therapists: step2[3].option,
                date: step1.date,
                time: step1.time,
                style: step2[2].option,
                massageLength: step2[1].option,
                address: (step4.streetAddress + step4.streetAddress2),
                creditCardNumber: step4.cardNumber,
            };
            console.log(data);
            let promise = BookingService.booking(data);
            promise.then(function (data) {
                $cookieStore.remove('step1');
                $cookieStore.remove('step2');
                $cookieStore.remove('step3');
                $cookieStore.remove('step4');
                $state.go("successfulBooking");
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
        //TODO 逻辑二选一
        // $http.get('../data/massage-therapists.json')
        //     .then(function (resdata) {
        //         // console.log(resdata.data);
        //         $scope.chooses = resdata.data;
        //
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/massage-therapists')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.chooses = data.returnValue;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });
        $timeout(function () {
            document.navInit(2)
        }, 0);

        $scope.booking = function () {
            $state.go('booking.step1');
        }
    })

    .controller('stylesCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        //TODO 逻辑二选一
        // $http.get('../data/home-massage-type.json')
        //     .then(function (resdata) {
        //         console.log(resdata);
        //         $scope.datas = resdata.data;
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/home-massage-type')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.datas = data.returnValue;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });
        $timeout(function () {
            document.navInit(3)
        }, 0);

        $scope.booking = function () {
            $state.go('booking.step1');
        }
    })

    .controller('pricingCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        //TODO 逻辑二选一
        // $http.get('../data/price.json')
        //     .then(function (resdata) {
        //         console.log(resdata);
        //         $scope.prices1 = resdata.data[0].priceList;
        //         $scope.prices2 = resdata.data[1].priceList;
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/price')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    console.log(data.returnValue);
                    $scope.prices = data.returnValue;
                    $scope.prices1 = data.returnValue[0].priceList;
                    $scope.prices2 = data.returnValue[1].priceList;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });
        $timeout(function () {
            document.navInit(4)
        }, 0);

        $scope.booking = function () {
            $state.go('booking.step1');
        }

    })

    .controller('faqCtrl', function ($rootScope, $scope, $state, $cookieStore, $http, $timeout) {
        //TODO 逻辑二选一
        // $http.get('../data/faq.json')
        //     .then(function (resdata) {
        //         console.log(resdata);
        //         $scope.items = resdata.data;
        //     });
        $http.post('http://localhost:4000/web/FrontEndData/faq')
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    $scope.items = data.returnValue;
                } else {
                    console.log(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                console.log(restResult.data.errorReason);
            });
        $timeout(function () {
            document.navInit(5)
        }, 0);

    })

    .controller('contactusCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout) {
        $timeout(function () {
            document.navInit(6)
        }, 0);

    })

    .controller('signinCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout, BookingService, UserService, AlertService) {
        $timeout(function () {
            document.navInit(7)
        }, 0);

        $scope.forgetPwd = function () {
            $state.go('forgetpassword');
        };
        //TODO:登陆登出判断
        $scope.login = function () {
            let content = {
                emailAddress: $scope.emailAddress,
                password: $scope.password
            };
            let promise = UserService.login(content);
            promise.then(function (data) {
                console.log(data);
                AlertService.success("登录成功!");
                console.log(data);
                $cookieStore.put('currentAccount', data.id);
                $state.go('home');
            }, function (reason) {
                console.log(reason);
                AlertService.error(reason);
            })
        }
    })

    .controller('signupCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout, AlertService, UserService) {

        $scope.signup = function (isValid) {

            console.log(isValid);
            // check to make sure the form is completely valid
            if (isValid) {
                let signupdata = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    emailAddress: $scope.emailAddress,
                    mobileNumber: $scope.mobileNumber,
                    password: $scope.password
                };
                let promise = UserService.register(signupdata);
                promise.then(function (data) {
                    console.log(data);
                    AlertService.success("注册成功!");
                    console.log(data);
                    $cookieStore.put('currentAccount', data.id);

                    $state.go('home');
                }, function (reason) {
                    console.log(reason);
                    flag = 0;
                    AlertService.error(reason);
                })
            } else {
                AlertService.error('error!');
            }

        }
    })
    .controller('administrationCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout, $http) {
        $http.get('../data/order.json')
            .then(function (resdata) {
                console.log(resdata);
                $scope.items = resdata.data;
            });
    })
    .controller('forgetpasswordCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout, $http, UserService, AlertService) {
        $scope.resetPassword = function () {
            let param = {
                emailAddress: $scope.emailAddress
            };
            let promise = UserService.resetPassword(param);
            promise.then(function (data) {
                AlertService.success("邮件已发送到您的邮箱");
                $state.go('home');
            }, function (reason) {
                console.log(reason);
                AlertService.error(reason);
            })
        }
    })
    .controller('successfulBookingCtrl', function ($rootScope, $scope, $state, $cookieStore, $timeout, $http) {
        $timeout(function () {
            $state.go('home');
        }, 1000);
    })
;