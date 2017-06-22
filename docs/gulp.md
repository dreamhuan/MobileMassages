Gulp  自动构建工具

1. Gulp 简介

Gulp.js 是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。Gulp.js 是基于 Node.js 构建的，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。Gulp.js 源文件和你用来定义任务的 Gulp 文件都是通过 JavaScript（或者 CoffeeScript ）源码来实现的。

--

1.1 安装 Gulp

1 . 全局安装 gulp
```text
npm install --global gulp
```

2 . 作为项目的开发依赖（devDependencies）安装：
```text
npm install --save-dev gulp
```

我们全局安装了gulp，项目也安装了gulp，全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能。
1.2 配置Gulp

在项目根目录下创建一个名为 gulpfile.js 的文件，gulpfile.js是gulp项目的配置文件
```javascript
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

1.3 运行gulp

在命令提示符执行 gulp 任务名称

<!-- 调用默认任务default -->
`gulp`  或者  `gulp default`
1.4 清除文件

通过gulp删除某个文件夹的文件

1 . 安装 gulp-clean
```text
npm i gulp-clean --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js'], { read: false })
               .pipe(clean());
});
```

1.5 编译less

通过gulp编译LESS代码

1 . 安装 gulp-less
```text
npm i gulp-less --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var less = require('gulp-less');

gulp.task('styles', function() {
    return gulp.src('src/less/*.less') //源文件路径
        .pipe(less()) //less编译
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

1.6 自动前缀

通过gulp处理css的自动前缀

1 . 安装 gulp-autoprefixer
```text
npm i gulp-autoprefixer --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(autoprefixer()) //自动前缀
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

1.7 base64编码

通过gulp将css中的图片转换成base65编码

1 . 安装 gulp-base64
```text
npm i gulp-base64 --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var base64 = require('gulp-base64');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(base64()) //base64编码
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

1.8 css压缩

通过gulp将css进行压缩

1 . 安装 gulp-minify-css
```text
npm i gulp-minify-css --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var cssmin = require('gulp-minify-css');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(cssmin()) //css压缩
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

1.9 排列文件顺序

通过gulp将js调整前后顺序

1 . 安装 gulp-order
```text
npm i gulp-order --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var order = require("gulp-order");

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(order([
            "src/js/config.js",
            "src/js/index.js"
        ]))
        .pipe(gulp.dest('dist/js')) //目的路径
})
```

1.10 合并文件

通过gulp将多个文件进行合并

1 . 安装 gulp-concat
```text
npm i gulp-concat --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(concat('main.js'))  //合并文件
        .pipe(gulp.dest('dist/js')) //目的路径
})
```

1.11 重命名文件

通过gulp将文件名进行更改

1 . 安装 gulp-rename
```text
npm i gulp-rename --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
         .pipe(rename({  
              suffix: '.min'
          }))   //修改文件名     
         .pipe(gulp.dest('dist/js')) //目的路径
})
```

1.12 JS文件压缩

通过gulp将js文件进行压缩

1 . 安装 gulp-uglify
```text
npm i gulp-uglify --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
         .pipe(uglify())   //压缩js
         .pipe(gulp.dest('dist/js')) //目的路径
})
```

1.13 图片压缩

通过gulp将图片进行压缩

1 . 安装 gulp-imagemin
```text
npm i gulp-imagemin --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});
```

1.14 处理串行任务

定义多个任务的顺序执行关系，否则默认情况下，任务会以最大的并发数同时运行。
```javascript
//清除任务
gulp.task('clean', function() {
    return gulp.src('dist/css', { read: false })
        .pipe(clean());
});

//编译任务
gulp.task('styles', function() {
    return gulp.src('src/less/*.less') //源文件路径
        .pipe(less()) //less编译                       
        .pipe(gulp.dest('dist/css')) //目的路径
});

//先清空目录，然后再执行编译CSS
gulp.task('default', ['clean'], function() {
    gulp.start('styles')
});
```

1.15 热加载服务

使用 BrowserSync 服务实现文件变更的实时编译调试

1 . 安装 browser-sync
```text
npm i browser-sync --save-dev
```

2 . 编写 gulpfile.js 代码
```javascript
var browserSync = require('browser-sync').create();

gulp.task('dev', function() {
    //初始化browser-sync服务
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    //检测less文件是否更改，来调用重新编译css
    gulp.watch('src/less/*', ['styles']);  

    //如果css文件更改过则刷新服务器
    gulp.watch( ['./dist/sys/css/*'] ).on("change", browserSync.reload)
});
```



### 全部的js：
```javascript
var gulp = require('gulp');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});

//清除文件
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js'], { read: false })
        .pipe(clean());
});

//编译less
var less = require('gulp-less');

gulp.task('styles', function() {
    return gulp.src('src/less/*.less') //源文件路径
        .pipe(less()) //less编译
        .pipe(gulp.dest('dist/css')) //目的路径
});
//自动前缀
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(autoprefixer()) //自动前缀
        .pipe(gulp.dest('dist/css')) //目的路径
});
//css的图片转base64编码
var base64 = require('gulp-base64');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(base64()) //base64编码
        .pipe(gulp.dest('dist/css')) //目的路径
});
//css压缩
var cssmin = require('gulp-minify-css');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(cssmin()) //css压缩
        .pipe(gulp.dest('dist/css')) //目的路径
});
//排列文件顺序
var order = require("gulp-order");

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(order([
            "src/js/config.js",
            "src/js/index.js"
        ]))
        .pipe(gulp.dest('dist/js')) //目的路径
});
//合并文件
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(concat('main.js'))  //合并文件
        .pipe(gulp.dest('dist/js')) //目的路径
});
//重命名文件
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(rename({
            suffix: '.min'
        }))   //修改文件名
        .pipe(gulp.dest('dist/js')) //目的路径
});
//JS文件压缩
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(uglify())   //压缩js
        .pipe(gulp.dest('dist/js')) //目的路径
});
//图片压缩
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});
//任务串行
//清除任务
gulp.task('clean', function() {
    return gulp.src('dist/css', { read: false })
        .pipe(clean());
});

//编译任务
gulp.task('styles', function() {
    return gulp.src('src/less/*.less') //源文件路径
        .pipe(less()) //less编译                       
        .pipe(gulp.dest('dist/css')) //目的路径
});

//先清空目录，然后再执行编译CSS
gulp.task('default', ['clean'], function() {
    gulp.start('styles')
});

//热加载服务
var browserSync = require('browser-sync').create();

gulp.task('dev', function() {
    //初始化browser-sync服务
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    //检测less文件是否更改，来调用重新编译css
    gulp.watch('src/less/*', ['styles']);

    //如果css文件更改过则刷新服务器
    gulp.watch( ['./dist/sys/css/*'] ).on("change", browserSync.reload)
});

```