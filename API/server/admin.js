const db = require("../db/mysql");
const md5 = require("../config/md5")
const jwt = require("../config/jwt")

class Message{
    constructor(state,msg,data){
        this.state = state;
        this.msg = msg;
        this.data = data;
    }
}

exports.login = function(req,res){
    let userName = req.body.name;
    let pwd = req.body.pwd;
    if (userName !== "admin" || md5(pwd.toString()) !== md5("123456")) {  // 在这里修改密码
        res.send(new Message(401,"用户名称或密码错误!"))
    }
    let token = jwt.generateToken(userName,pwd);
    res.send(new Message(200,"登录成功！",token));
}