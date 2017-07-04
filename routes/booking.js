const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const pool = require('../config/config');
const bookingSQL = require('../sql/bookingSQL');


/**
 * 订单
 */
router.post('/booking', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {

        // 获取前台页面传过来的参数
        // let param = req.query || req.params; //get请求用这句
        let param = req.body; //post请求
        console.log(param);
        // 建立连接 增加一个用户信息
        for (let i in param.therapists) {
            connection.query(bookingSQL.findTherapistByName, param.therapists[i].name, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    return;
                }
                let therapistId = doc[0].id;
                connection.query(bookingSQL.addOrder, [param.userId, therapistId, param.date, param.time, param.style, param.massageLength, param.address, param.creditCardNumber], function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                        return;
                    }
                })
            })
        }
        res.success("Add Successful!");
    });
});
module.exports = router;