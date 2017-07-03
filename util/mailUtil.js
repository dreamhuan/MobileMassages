const nodemailer = require('nodemailer');
//配置邮件
let transporter = nodemailer.createTransport('SMTP',{
    host: 'smtp.163.com',
    secureConnection: true,
    port:465,
    auth: {
        user: 'mobilemassages@163.com',
        pass: 'Mobile123', //这里是网易邮箱的SMTP授权码 密码是: 'Mobile',
    }
});
//发送邮件
let sendmail = function(address, title, content){
    let option = {
        from:'mobilemassages@163.com',
        to: address
    };
    option.subject = title;
    option.html= content;
    transporter.sendMail(option, function(error, response){
        if(error){
            console.log('fail: ' + error);
        }else{
            console.log('success: ' + response.message);
        }
    });
};
module.exports = sendmail;
//调用发送邮件
//sendmail('fu_kaiqi@qq.com','testEmail','这是来自nodemailer发送的邮件！');