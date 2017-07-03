const desUtil = require('./desUtil');
const sendmail = require('./mailUtil');

// let message = '阿凡达儿科微晶蜡啥的发多少fdsawr2133213;#@%#!@?@#￥，。、；432534';
// let ciphertext = desUtil.encrypt(massage);
// let plaintext = desUtil.decrypt(ciphertext);
// console.log(ciphertext);
// console.log(plaintext);

sendmail('fu_kaiqi@qq.com','testEmail','这是来自nodemailer发送的邮件！');