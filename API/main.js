const express = require("express");
const cors = require('cors'); // 安装模块 
const app = express();
const port = 3000;


app.use(cors())// 跨域
// post参数需要
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// 路由
const index = require("./router/index.js");
app.use(index);

app.get("/test",(req,res)=>{
    res.send("get成功！")
})

app.use((req, res) => { //404页面
    res.status(404).send({
        msg: "404 请求未找到!"
    });
});

app.listen(port, () => {
    console.log("服务开启成功！端口为：" + port);
});