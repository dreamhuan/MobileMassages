确保已安装node,npm,bower,gulp  
其中npm是后端包管理器,bower是前端包管理器gulp是自动构建工具  
若没有则先安装node  
安装bower：
```text
npm install -g bower
```
进入项目根目录执行
```text
npm install
```
进入/public/lib目录执行
```text
bower install
```
运行：项目根目录下
```text
npm start
```
前端构建：
```text
gulp
```

### 邮件服务
修改`node_modeules/nodemailer/lib/wellknown.js`在后面加上
```text
"163":{
    transport: "SMTP",
    host: "smtp.163.com",
    port:465,
    secureConnection: true,
    requiresAuth: true,
    domains: ["163.com"]
 }
```