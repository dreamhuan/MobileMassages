# ng2引入bootstrap、jquery
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
在typings.d.ts改为
```text
/* SystemJS module definition */
declare var module: NodeModule;
declare var JQuery: any;
declare var jQuery: any;
declare var $: any;
interface NodeModule {
  id: string;
}

```

