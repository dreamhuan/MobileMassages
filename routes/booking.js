const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const pool = require('../config/config');
const bookingSQL = require('../sql/bookingSQL');


/**
 * 添加 Todo:照抄过来的，待完善
 */
router.post('/register', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {

        // 获取前台页面传过来的参数
        // let param = req.query || req.params; //get请求用这句
        let param = req.body; //post请求
        console.log(param);
        // 建立连接 增加一个用户信息
        connection.query(bookingSQL.register, [param.content], function (err, doc) {
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


module.exports = router;