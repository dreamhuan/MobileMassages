const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const desUtils = require('../util/desUtil');
const async = require('async');
const pool = require('../config/config');
const userSQL = require('../sql/userSQL');
const sendmail = require('../util/mailUtil');

/**
 * 注册
 */
router.post('/register', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {

        // 获取前台页面传过来的参数
        // let param = req.query || req.params; //get请求用这句
        let param = req.body; //post请求
        console.log(param);
        // 建立连接 增加一个用户信息
        connection.query(userSQL.findUserByEmailName, [param.emailAddress], function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            console.log(doc);
            if (doc.length) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, 'The email has been used');
                return;
            }
            connection.query(userSQL.register, [param.firstName, param.lastName, param.emailAddress, param.mobileNumber, desUtils.encrypt(param.password)], function (err, doc) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    return;
                }
            });
            connection.query(userSQL.findUserByEmailName, [param.emailAddress], function (err, doc) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    return;
                }
                // console.log(doc);
                let result = {
                    id: doc[0].id,
                    content: doc[0]
                };
                res.success(result);
            });

        })
    });
});

/**
 * 登录
 */
router.post('/login', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {

        // 获取前台页面传过来的参数
        // let param = req.query || req.params; //get请求用这句
        let param = req.body; //post请求
        console.log(param);
        // 建立连接 增加一个用户信息
        connection.query(userSQL.findUserByEmailName, [param.emailAddress], function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            if (doc.length === 0) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, 'The user doesn\'t exist');
                return;
            }
            console.log(doc[0]);
            if (doc[0].password !== desUtils.encrypt(param.password)) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, 'Wrong Password!');
                return;
            }
            let result = {
                id: doc[0].id,
                content: doc[0]
            };
            res.success(result);

        })
    });
});

/**
 * 重置密码
 */
router.post('/resetPassword', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        let random = parseInt(Math.random() * 1000000) + ''; //6位随机数
        let pwd = desUtils.encrypt(random);  //密文保存
        let param = req.body; //post请求
        connection.query(userSQL.alterPasswordByEmaill, [pwd, param.emailAddress], function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, 'Congratulations,the database is boom!');
                return;
            }
            if (!doc.changedRows) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, 'The email doesn\'t exist!');
                return;
            }
            sendmail(param.emailAddress, "To confirm your password reset in mobile massages", "Dear customer: " + param.emailAddress + "\n" + "We have received your request of resetting your password,and here is your new password:" + random);
            res.success('Send Successful!');
        });


    });
});

module.exports = router;
