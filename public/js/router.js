angular.module('app.routes', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('test', {
                url: '/test',
                templateUrl: './templates/test.html',
                controller: 'testCtrl',
            })

            .state('home', {
                url: '/home',
                templateUrl: './templates/Home.html',
                controller: 'homeCtrl',
            })

            .state('booking', {
                url: '/booking',
                abstract: true,
                templateUrl: './templates/BookIng.html',
                controller: 'bookingCtrl',
            })
            .state('signup', {
                url: '/signup',
                templateUrl: './templates/signUp.html',
                controller: 'signupCtrl',
            })

            .state('booking.step1', {
                url: '/step1',
                templateUrl: './templates/Step1.html',
                controller: 'step1Ctrl',
            })
            .state('booking.step2', {
                url: '/step2',
                templateUrl: './templates/Step2.html',
                controller: 'step2Ctrl',
            })
            .state('booking.step3', {
                url: '/step3',
                templateUrl: './templates/Step3.html',
                controller: 'step3Ctrl',
            })
            .state('booking.step4', {
                url: '/step4',
                templateUrl: './templates/Step4.html',
                controller: 'step4Ctrl',
            })

            .state('therapist', {
                url: '/therapist',
                templateUrl: './templates/Therapist.html',
                controller: 'therapistCtrl',
            })

            .state('styles', {
                url: '/styles',
                templateUrl: './templates/Styles.html',
                controller: 'stylesCtrl',
            })

            .state('pricing', {
                url: '/pricing',
                templateUrl: './templates/Pricing.html',
                controller: 'pricingCtrl',
            })

            .state('faq', {
                url: '/faq',
                templateUrl: './templates/FAQ.html',
                controller: 'faqCtrl',
            })

            .state('contactus', {
                url: '/contactus',
                templateUrl: './templates/ContactUs.html',
                controller: 'contactusCtrl',
            })

            .state('signin', {
                url: '/signin',
                templateUrl: './templates/SignIn.html',
                controller: 'signinCtrl',
            })
            .state('forgetpassword', {
                url: '/forgetpassword',
                templateUrl: './templates/ForgetPassword.html',
                controller: 'forgetpasswordCtrl',
            })
            .state('successfulBooking', {
                url: '/successfulBooking',
                templateUrl: './templates/successfulBooking.html',
                controller: 'successfulBookingCtrl',
            })
        ;
    });