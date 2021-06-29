const express = require("express");
const cors = require('cors'); // 安装模块 
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
    return next();
    console.log(req.path);
    let nextArr = ["/getList", "/login", "/getVerifCode"]
    if (nextArr.includes(req.path)) {
        return next();
    }
})

// 路由
const index = require("./router/index.js");
app.use(index);

app.use((req, res) => { //404页面
    res.status(404).send({
        msg: "404 请求未找到!"
    });
});

app.listen(port, () => {
    console.log("服务开启成功！端口为：" + port);
});