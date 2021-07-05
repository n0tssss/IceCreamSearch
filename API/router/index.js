const express = require("express");
const router = express.Router();
const homeServer = require("../server/hoem")
const adminServer = require("../server/admin")

// 首页获取数据
router.get("/api/getList", (req, res) => {
    homeServer.getList(req, res);
});

// 获取验证码
router.get("/api/getVerifCode", (req, res) => {
    adminServer.getCaptcha(req, res)
});

// 管理员登录
router.post("/api/login", (req, res) => {
    adminServer.login(req, res);
});

// 获取链接数据
router.get("/api/getLinks", (req, res) => {
    adminServer.getLinks(req, res);
});

// 添加链接
router.post("/api/addLink", (req, res) => {
    adminServer.addLink(req, res);
})

// 修改链接
router.post("/api/updateLink", (req, res) => {
    adminServer.updateLink(req, res)
})


// 删除链接
router.post("/api/deleteLink", (req, res) => {
    adminServer.deleteLink(req, res)
})

// 添加分类
router.post("/api/addClass", (req, res) => {
    adminServer.addClass(req, res);
})

//  删除分类
router.post("/api/deleteClass", (req, res) => {
    adminServer.deleteClass(req, res);
})

// 修改分类 
router.post("/api/updateClass", (req, res) => {
    adminServer.updateClass(req, res);
})


module.exports = router;