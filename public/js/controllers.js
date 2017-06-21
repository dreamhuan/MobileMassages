angular.module('app.controllers', [])

    //-------------------------------------- 主页 登录 注册 home login register----------------------------------------
    .controller('homeCtrl', function ($rootScope,$scope, $state, $cookieStore) {
        $cookieStore.put('currentState', 'home');
        $rootScope.ClearCenterNav=function () {
            $cookieStore.put('lastCenterNavStatus',"");
        }
    })
;