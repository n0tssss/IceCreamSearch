new Vue({
    el: '#Search',
    data: {
        soBoxtextDom: document.querySelector("#soBoxtext"), // 输入框获取
        soBoxlistDom: document.querySelector("#soBoxlist"), // 结果获取
        soBoxtext: '', // 输入框内容
        soBoxlist: [], // 搜索结果
        soBoxlistShowNum: 8, // 最大显示结果数量
    },
    created() {
        window.sessionStorage.setItem("soBoxlistShowNum", this.soBoxlistShowNum);
    },
    methods: {
        // 搜索框聚焦
        SoFocus(b) {
            if (b) {
                document.querySelector(".soBoxtext").classList.add("soBoxtextFocus");
            } else {
                document.querySelector(".soBoxtext").classList.remove("soBoxtextFocus");
            }
        },
        // 输入框内容处理
        SoChange(e) {
            let vm = this;
            // 清空结果
            document.querySelector("#soBoxlist").innerHTML = "";

            // 结果显示
            if (vm.soBoxtext) {
                document.querySelector(".soBoxlist").classList.add("soBoxlistShow");
            } else {
                document.querySelector(".soBoxlist").classList.remove("soBoxlistShow");
            }

            // 回车跳转
            if (e.keyCode == 13) {
                window.open('https://www.baidu.com/s?wd=' + vm.soBoxtext)
                this.keydown = '';
            }

            if (vm.soBoxtext) {
                // 动态创建script标签
                let oScript = document.createElement("script");
                oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + vm.soBoxtext + "&cb=callback";
                // 添加链接及回调函数
                document.body.appendChild(oScript);
                document.body.removeChild(oScript);
            }
        },
    }
})