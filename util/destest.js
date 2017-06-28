let desUtil = require('./desUtil');
let a = '阿凡达儿科微晶蜡啥的发多少fdsawr2133213;#@%#!@?@#￥，。、；432534';
let b = desUtil.encrypt(a);
let c = desUtil.decrypt(b);
console.log(b);
console.log(c);