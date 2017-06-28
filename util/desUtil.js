const crypto = require('crypto');
const key = 'aaaabbbbccccdddd12345678'; //length=24
const iv = '87654321'; //length=8

let encrypt = function (text) {
    let cipher = crypto.createCipheriv('des3', new Buffer(key), new Buffer(iv));
    let ciph = cipher.update(text, 'utf8', 'base64');
    ciph += cipher.final('base64');
    return ciph;
};


let decrypt = function (text) {
    let decipher = crypto.createDecipheriv('des3', new Buffer(key), new Buffer(iv));
    try {
        let planTxt = decipher.update(text, 'base64', 'utf8');
        planTxt += decipher.final('utf8');
        return planTxt;
    } catch (e) {
        return false;
    }

};

exports.encrypt = encrypt;
exports.decrypt = decrypt;
