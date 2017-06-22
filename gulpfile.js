//package.json
// "devDependencies": {
//     "browser-sync": "^2.18.12",
//         "gulp": "^3.9.1",
//         "gulp-autoprefixer": "^4.0.0",
//         "gulp-base64": "^0.1.3",
//         "gulp-clean": "^0.3.2",
//         "gulp-concat": "^2.6.1",
//         "gulp-imagemin": "^3.3.0",
//         "gulp-jshint": "^2.0.4",
//         "gulp-less": "^3.3.2",
//         "gulp-minify-css": "^1.2.4",
//         "gulp-order": "^1.1.1",
//         "gulp-rename": "^1.2.2",
//         "gulp-uglify": "^3.0.0",
//         "jshint": "^2.9.4"
// }


// //引入gulp组件
// const gulp = require('gulp');
// //清除文件
// const clean = require('gulp-clean');
// //自动前缀
// const autoprefixer = require('gulp-autoprefixer');
// //css的图片转base64编码
// const base64 = require('gulp-base64');
// //css压缩
// const cssmin = require('gulp-minify-css');
// //js语法检查
// const jshint = require('gulp-jshint');
// //less预处理
// const less = require('gulp-less');
// //文件合并
// const concat = require('gulp-concat');
// //js压缩
// const uglify = require('gulp-uglify');
// //重命名
// const rename = require('gulp-rename');
// //server服务
// browserSync = require('browser-sync').create();
//
// gulp.task('clean', function () {
//     return gulp.src(['dist/css', 'dist/js/all.js'], {read: false})
//         .pipe(clean());
// });
//
// const jsFiles = [
//     './public/lib/bower_components/jquery/dist/jquery.js',
//     './public/lib/bower_components/bootstrap/dist/js/bootstrap.js',
//     './public/lib/bower_components/angular/angular.js',
//     './public/lib/bower_components/angular-ui-router/release/angular-ui-router.js',
//     './public/lib/bower_components/sweetalert2/dist/sweetalert2.min.js',
//     './public/lib/bower_components/angular-animate/angular-animate.js',
//     './public/lib/bower_components/angular-cookies/angular-cookies.js',
// ];
//
// //合并、压缩来自bower的js资源文件
// gulp.task('bower', function () {
//     return gulp.src(jsFiles)
//         .pipe(concat('bower.js'))
//         .pipe(gulp.dest('./dist/js'))
//     //有es6语法and错误太多不能压缩...
//     // .pipe(rename('bower.min.js'))
//     // .pipe(uglify())
//     // .pipe(gulp.dest('./dist/js'));
// });
//
// //检查脚本
// gulp.task('lint', function () {
//     gulp.src('./public/js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
//
// });
//
// //编译Less(idea自动编译完了)
// // gulp.task('less', function () {
// //     console.log('less!');
// //     gulp.src('./public/css/*.less')
// //         .pipe(less())
// //         .pipe(gulp.dest('./public/style'));
// //     gulp.src('./public/css/*.css')
// //         .pipe(concat('style.css'))
// //         .pipe(gulp.dest('./dist/css'))
// // });
//
// //合并、压缩js文件
// gulp.task('scripts', function () {
//     gulp.src('./public/js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('./dist/js'))
//     // .pipe(rename('all.min.js'))
//     // .pipe(uglify())
//     // .pipe(gulp.dest('./dist/js'));
// });
//
// //合并、压缩css文件
// gulp.task('css', function () {
//     gulp.src('./public/css/*.css')
//         .pipe(autoprefixer()) //自动前缀
//         .pipe(base64()) //base64编码
//         .pipe(concat('style.css'))
//         .pipe(gulp.dest('./dist/css'))
//         .pipe(rename('style.min.css'))
//         .pipe(cssmin()) //css压缩
//         .pipe(gulp.dest('./dist/css'));
// });
//
//
// //默认任务
// gulp.task('default', ['clean'], function () {
//     gulp.run('bower');
//     gulp.run('scripts');
//     gulp.run('css');
//
//     //初始化browserSync
//     browserSync.init({
//         server: {
//             baseDir: "./public/"
//         }
//     });
//
//     //监听js变化,如过发生变化则执行lint和scripts两个task
//     // gulp.watch('./public/**/*.js', ['lint', 'scripts']);
//     gulp.watch('./public/js/*.js', ['scripts']);
//
//     //监听less变化,如过发生变化则执行less task
//     // gulp.watch('./public/style/**/*.less', ['less']);
//     gulp.watch('./public/style/css/*.css', ['css']);
//
//     //监听当public文件夹下任何文件发生变化，则自动刷新浏览器
//     gulp.watch('./public/**', function () {
//         console.log('reload');
//         browserSync.reload();
//     });
// });
//




const gulp = require('gulp');
browserSync = require('browser-sync').create();

gulp.task('default', function () {

    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
    gulp.watch('./public/**', function () {
        console.log('reload');
        browserSync.reload();
    });
});
