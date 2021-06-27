const crypto = require('crypto')

// 导出
module.exports = function md5(s) {
    //注意参数需要为string类型，否则会报错
    return crypto.createHash('md5').update(String(s)).digest('hex');
} 