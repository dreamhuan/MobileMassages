var UserSQL = {
    insert:'INSERT INTO user(uid,userName) VALUES(?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE uid = ? ',
};
module.exports = UserSQL;