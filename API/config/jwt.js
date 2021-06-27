const jwt = require("jsonwebtoken");
const cert = "lcw_nb";

exports.generateToken = function (username, password) {
    return jwt.sign({
            // token数据
            username,
            password,
        },
        cert, // 密钥
        {
            //参数 options
            algorithm: "HS256", // 加密算法   对称加密算法
            issuer: "lcw", // 签发人
            expiresIn: 1000 * 60 * 60 * 24, // 过期时间   单位：s
        }
    );
}

exports.verifyToken = function (token) {
    try {
        let arr = jwt.verify(token, cert, {
            issuer: "lcw",
            algorithms: ["HS256"],
        });
        return arr;
    } catch (error) {
        return {
            code: 10000,
            message: error.message,
        };
    }
}