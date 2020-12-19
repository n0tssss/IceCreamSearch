window.onload = function () {
    // 获取元素
    let soBoxtext = document.getElementById("soBoxtext");
    let soBoxlist = document.getElementById("soBoxlist");
    let soBoxbtn = document.getElementById("soBoxbtn");

    // 监测按键
    soBoxtext.onkeyup = function () {
        soBoxlist.innerHTML = "";
        let val = soBoxtext.value;
        if (val) {
            // 动态创建script标签
            let oScript = document.createElement("script");
            oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=callback";
            // 添加链接及回调函数
            document.body.appendChild(oScript);
            document.body.removeChild(oScript);
        }
    }

    // 跳转搜索
    soBoxbtn.onclick = function () {
        let val = soBoxtext.value;
        location.href = "http://www.baidu.com.cn/s?wd=" + val + "&cl=3";
    }
}