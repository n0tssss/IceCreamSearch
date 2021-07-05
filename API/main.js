const express = require("express");
const cors = require('cors'); // 安装模块 
const jwt = require("./config/jwt")
const app = express();
const port = 3000;

app.use(cors()) // 跨域
// post参数需要
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// 验证jwt 预留位置
app.use("/api", (req, res, next) => {
    let nextArr = ["/getList", "/login", "/getVerifCode"]
    if (nextArr.includes(req.path)) {
        return next();
    }
    let vif = jwt.verifyToken(req.headers.token);
    if (vif.iss == "lcw" && !vif.code) {
        return next();
    }
    return res.send({
        state: 401,
        msg: vif.message
    });
})

// 路由
const index = require("./router/index.js");
app.use(index);

app.use('/test', (req, res) => {
    res.send("接口成功！")
})

app.use((req, res) => { //404页面
    res.status(404).send({
        msg: "404 请求未找到!"
    });
});

app.listen(port, () => {
    console.log("服务开启成功！端口为：" + port);
});