const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');


const RestResult = require('./RestResult');
const config = require('./config/config');



const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



//app访问预处理中间件
app.use(function (req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*"); //允许哪些url可以跨域请求到本域
    res.setHeader("Access-Control-Allow-Methods", "GET,POST"); //允许的请求方法，一般是GET,POST,PUT,DELETE,OPTIONS
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type,Token"); //允许哪些请求头可以跨域

    res.error = function (errorCode, errorReason) {
        const restResult = new RestResult();
        restResult.code = errorCode;
        restResult.errorReason = errorReason;
        res.send(restResult);
    };


    res.success = function (returnValue) {
        const restResult = new RestResult();
        restResult.code = RestResult.NO_ERROR;
        restResult.returnValue = returnValue || {};
        res.send(restResult);
    };


    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress; //设置ip
    req.clientIP = ip;//将解析后的ip放入req中,一遍方便使用

    next();
});


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
