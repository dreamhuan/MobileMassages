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

module.exports = pool;