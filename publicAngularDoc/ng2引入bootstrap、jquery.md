# ng2引入第三方库(bootstrap,font-awesome...)
## jquery,bootstrap
```text
npm install ng2-bootstrap bootstrap --save
npm install jquery --save
```
在.angular-cli.json里引入
```text
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
 "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
 ]
```
### 以下方式二选一
在typings.d.ts加入(会吧$,jQuery,JQuery加入全局作用域)  
```text
declare var JQuery: any;
declare var jQuery: any;
declare var $: any;
```
也可以自己下载申明文件后在相应地方引入作为局部作用域  
```text
npm install @types/jquery --save-dev
import 'jquery'
```

## sweetalert2：
```text
npm install sweetalert2 --save
```
在.angular-cli.json里引入
```text
"styles": [
    "../node_modules/sweetalert2/dist/sweetalert2.css"
  ],
 "scripts": [
    "../node_modules/sweetalert2/dist/sweetalert2.js"
 ]
```
使用：  
```text
import swal from 'sweetalert2';
```

## font-awesome：
```text
npm install font-awesome --save
```
在.angular-cli.json里引入
```text
"styles": [
    "../node_modules/sweetalert2/dist/sweetalert2.css"
  ],
 "scripts": [
    "../node_modules/sweetalert2/dist/sweetalert2.js"
 ]
```

