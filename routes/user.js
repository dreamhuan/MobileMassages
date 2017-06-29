const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const desUtils = require('../util/desUtil');
const async = require('async');
const pool = require('../config/config');
const userSQL = require('../sql/userSQL');


/**
 * 注册
 */
router.post('/register', function (req, res, next) {

});

/**
 * 登陆
 */
router.post('/login', function (req, res, next) {

});

/**
 * 发送重置密码
 */
router.post('/resetPwd', function (req, res, next) {

});

/**
 * 获得个人信息
 */
router.post('/getLatestInformation', function (req, res, next) {

});
/**
 * 获得用户列表
 */
router.post('/showAlluser', function (req, res, next) {

});

/**
 * 修改用户信息
 */
router.post('/editUser', function (req, res, next) {

});

module.exports = router;
