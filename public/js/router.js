angular.module('app.routes', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './templates/main/home.html',
                controller: 'homeCtrl',
            })
            .state('test', {
                url: '/home',
                templateUrl: './templates/main/home.html',
                controller: 'homeCtrl',
            })



        ;
    });