//配置MySQL基本信息
const mysqlConfig = {
    host: '127.0.0.1',
    user: 'mm',
    password: '123456',
    database: 'mobilemassages',
    port: 3306
};
// 导入MySQL模块
const mysql = require('mysql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool(mysqlConfig);

//导出mysql连接池
module.exports = pool;

//配置mongoose信息
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mobilemassages', function (err) {
        if (err) {
            console.log('connection err', err);
        } else {
            console.log('connection successful');
        }
    }
)
;

//导出mongoose对象
module.exports.mongoose = mongoose;
