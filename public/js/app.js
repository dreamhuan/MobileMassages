angular.module('app', [
    'app.routes',
    'app.controllers',
    'app.services',
    'ngCookies',   //操作cookie
])

    .constant('hostip', 'http://localhost:4000/')  //本地开发环境地址
    //.constant('hostip', 'http://123.206.111.244:4000/')  //正式环境地址

    .filter("myDateTime", function () { //ISODate格式到本地时间转换
        return function (input) {
            let date = new Date(input);
            return (date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
        }
    })

    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {

        });
    });