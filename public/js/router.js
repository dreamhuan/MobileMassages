angular.module('app.routes', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './templates/Home.html',
                controller: 'homeCtrl',
            })
            .state('test', {
                url: '/test',
                templateUrl: './templates/test.html',
                controller: 'testCtrl',
            })
            .state('successfulBooking', {
                url: '/successfulBooking',
                templateUrl: './templates/successfulBooking.html',
                controller: 'successfulBookingCtrl',
            })

        ;
    });