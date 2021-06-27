const mysql_config = require('../config/mysqldb');
const mysql = require('mysql');
//链接数据库
let pool;
try {
    pool = mysql.createPool(mysql_config);
    console.log("数据库链接成功！");
} catch (error) {
    console.log(error + "数据库链接失败！");
};


module.exports = function (sqlStr, arr) {
    return new Promise((reslove, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return reject(err);
            }
            conn.query(sqlStr, arr, (err2, res) => {
                conn.release();
                if (err2) {
                    reject(err2);
                } else {
                    reslove(res);
                }
            })
        })
    })
};