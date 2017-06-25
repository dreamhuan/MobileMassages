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
            return new Date(input).Format("yyyy-MM-dd hh:mm:ss");
        }
    })

    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {

        });

        $rootScope.option = [
            {opt: 1, cls: 0},
            {opt: 2, cls: 0},
            {opt: 3, cls: 0},
            {opt: 4, cls: 0},
        ];

        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 调用：
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S")
        Date.prototype.Format = function (fmt) { //author: meizz
            const o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt =
                    fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                        (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };

        //根据url获取当前的路由名
        //要求：路由设计时的url和state名要完全一致
        //使用：document.getCurrentState();
        //注意不要放在页面刚切换时使用，因为切换路由后url的改变会有延迟，所以放在刚加载时调用就会得到上个state
        //或者这么用$timeout(function(){document.getCurrentState()},0);//加到任务队列尾部，确保渲染完后再调用
        Document.prototype.getCurrentState = function () {
            let url = document.URL;
            let statePos = url.indexOf('/#!/') + 4;//起点是"/#!/"的最后那个/后面的内容
            let state = url.substring(statePos, url.length);
            return state.replace('/', '.');
        };
    });