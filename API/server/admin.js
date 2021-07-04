const db = require("../db/mysql");
const md5 = require("../config/md5")
const jwt = require("../config/jwt")
const svgCaptcha = require('svg-captcha');

let vCode = "";

class Message {
    constructor(state, msg, data) {
        this.state = state;
        this.msg = msg;
        this.data = data;
    }
}

// 登录
exports.login = (req, res) => {
    let code = req.body.code;
    if (code !== vCode.toLowerCase()) {
        console.log(code, vCode);
        return res.send(new Message(401, '验证码错误！'))
    }
    let userName = req.body.name;
    let pwd = req.body.pwd;
    if (userName !== "admin" || md5(pwd.toString()) !== md5("123456")) { // 在这里修改密码
        res.send(new Message(401, "用户名称或密码错误!"))
    }
    let token = jwt.generateToken(userName, pwd);
    res.send(new Message(200, "登录成功！", token));
}

// 获取验证码
exports.getCaptcha = (req, res) => {
    const captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1liO',
        noise: 2,
        color: true,
        inverse: true,
        fontSize: 70,
    });
    vCode = captcha.text;
    res.type('svg');
    res.send(new Message(200, "成功！", captcha.data));
}

// 添加链接
exports.addLink = async (req, res) => {
    let data = req.body;
    let rows = await db("insert into link values(null,?,?,?,?,?)", [data.name, data.img, data.link, data.content, data.navId])
    if (rows.affectedRows > 0) {
        res.send(new Message(200, "添加成功！"));
    } else {
        res.send(new Message(401, "添加失败！"));
    }
}

// 修改链接
exports.updateLink = async (req, res) => {
    let data = req.body;
    let rows = await db("UPDATE link SET `name`=?,img=?,link=?,content=?,navId=? WHERE id = ?", [data.name, data.img, data.link, data.content, data.navId, data.id])
    if (rows.affectedRows > 0) {
        res.send(new Message(200, "修改成功！"));
    } else {
        res.send(new Message(401, "修改失败！"));
    }
}

// 删除链接
exports.deleteLink = async (req, res) => {
    let linkId = req.body.id;
    let rows = await db("DELETE FROM link WHERE id = ?", [linkId]);
    if (rows.affectedRows > 0) {
        res.send(new Message(200, "删除成功！"));
    } else {
        res.send(new Message(401, "删除失败！"));
    }
}

// 添加分类
exports.addClass = async (req, res) => {
    let className = req.body.className;
    let rows = await db("insert into class values(null,?)", [className]);
    if (rows.affectedRows > 0) {
        res.send(new Message(200, "添加成功！"));
    } else {
        res.send(new Message(401, "添加失败！"));
    }
}

// 删除分类
exports.deleteClass = async (req, res) => {
    let rows = await db("DELETE FROM class WHERE id = ?", [req.body.id])
    if (rows.affectedRows > 0) {
        res.send(new Message(200, "删除成功！"));
    } else {
        res.send(new Message(401, "删除失败！"));
    }
}

// 修改分类
exports.updateClass = async (req, res) => {
    let rows = await db("UPDATE class SET navName=? WHERE id = ?", [req.body.navName,req.body.id])
    if (rows.affectedRows > 0) {
        res.send(new Message(200, "修改成功！"));
    } else {
        res.send(new Message(401, "修改失败！"));
    }
}