const express = require("express");
const router = express.Router();
const homeServer = require("../server/hoem")
const adminServer = require("../server/admin")

// 首页获取数据
router.get("/api/getList", (req, res) => {
    homeServer.getList(req,res);
});

// 管理员登录
router.post("/api/login",(req,res)=>{
    adminServer.login(req,res);
})

module.exports = router;