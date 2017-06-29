const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const pool = require('../config/config');
const testSQL = require('../sql/testSQL');


/**
 * 添加
 */
router.post('/add', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {

        // 获取前台页面传过来的参数
        // let param = req.query || req.params; //get请求用这句
        let param = req.body; //post请求
        console.log(param);
        // 建立连接 增加一个用户信息
        connection.query(testSQL.insert, [param.content], function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            if (doc) {
                console.log(doc);
                let result = {
                    id: doc.insertId,
                    content: param.content
                };
                res.success(result);
            }

            // 释放连接
            connection.release();
        });
    });
});

/**
 * 删除
 */
router.post('/delete', function (req, res, next) {
    let id = req.body.id;
    console.log(id);
    pool.getConnection(function (err, connection) {

        connection.query(testSQL.delete, [id], function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            if (doc) {
                console.log(doc);
                res.success(doc);
            } else {
                res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "无内容");
            }
            connection.release();
        });
    });
});

/**
 * 修改
 */
router.post('/update', function (req, res, next) {
    let param = req.body;
    console.log(param);
    pool.getConnection(function (err, connection) {

        connection.query(testSQL.updateById, [param.content, param.id], function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            if (doc) {
                console.log(doc);
                res.success(doc);
            } else {
                res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "无内容");
            }
            connection.release();
        });
    });
});

/**
 * 查询
 */
router.post('/getalltodo', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(testSQL.queryAll, function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            if (doc) {
                // console.log(doc);
                res.success(doc);
            } else {
                res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "无内容");
            }

            connection.release();
        });
    });
});


module.exports = router;