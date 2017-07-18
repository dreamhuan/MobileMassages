# angular-cli常用命令
>打开服务器并实时编译运行Angular应用  
`ng server`  
简写：`ng s`  
切换端口  
`ng serve --host 0.0.0.0 --port 4201`
编译完自动打开  
`ng s --p 4201 -o`
  
>建立生产环境  
`ng build --prod --aot`  
会产生`dist`文件夹，安装一个服务器打开看看效果：  
安装服务器：`npm i -g http-server`  
打开(进入dist目录)：`http-server .`  
打开`localhost:8080`查看效果  
生产环境需要对路由做hash处理：  
只需在`app-routing.module.ts`中为`RouterModule`配置`{ useHash: true }`的属性即可  
这样的话angular会在url上加上一个#  
比如login的url现在是`http://localhost:8080/#/login`
```text
...
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
...
```
  
>创建组件并使用内联html和内联css
`ng generate component xxx --inline-template --inline-style`  
简写：`ng g c xxx -it -is`  
(不内联：`ng g c xxx`)
  
>创建相应的内容：  
组件：`ng g c`  
服务：`ng g s`  
模块：`ng g m`  
  

