import $stor from './wdnmd2.js'

new Vue({
    el: '#Search',
    data: {
        initDialog: true, // 初始化窗口显示
        updateStorage: true, // 用户是否允许操作 Storage
        soBoxtextDom: document.querySelector("#soBoxtext"), // 输入框获取
        soBoxlistDom: document.querySelector("#soBoxlist"), // 结果获取
        soBoxtext: '', // 输入框内容
        soBoxlist: [], // 搜索结果
        soBoxlistShow: false, // 搜索结果展示
        soBoxlistShowNum: 8, // 搜索结果数量
        leftBar: false, // 左侧菜单是否打开
        tabsActive: 'option', // 左侧菜单默认选择项
    },
    created() {
        this.initWindow(); // 初始化
        this.gethitokoto(); // 一言
    },
    methods: {
        // 初始化
        initWindow() {
            let vm = this;
            let storageCache = $stor.storage.get("IceCream");
            let sessionCache = $stor.session.get("IceCream");
            // 是否存在用户配置
            if(storageCache) {
                vm.initDialog = false;
            }
        },
        // 本地存储修改
        initDialogClose(b) {
            let vm = this;
            if (b) {
                vm.updateStorage = true;
                vm.$message.success("已开启本地存储设置");
            } else {
                vm.updateStorage = false;
                $stor.storage.remove("IceCream");
                vm.$message.warning("已关闭本地存储设置，设置里面还可以开启哦");
            }
            // 记住用户设置
            this.saveStorage();
            // 关闭窗口
            vm.initDialog = false;
        },
        // 本地存储开关
        StorageStatus() {
            let vm = this;
            if (vm.updateStorage) {
                vm.initDialogClose(true);
            } else {
                vm.initDialogClose(false);
            }
        },
        // 一言API
        gethitokoto() {
            fetch('https://v1.hitokoto.cn')
                .then(response => response.json())
                .then(data => {
                    const hitokoto = document.querySelector('#hitokoto');
                    hitokoto.innerText = data.hitokoto
                })
                .catch(console.error)
        },
        // 搜索框聚焦
        SoFocus(b) {
            if (b) {
                this.soBoxlistShow = true;
                document.querySelector(".bingBg").classList.add("bingBgBlack");
                document.querySelector(".soBoxtext").classList.add("soBoxtextFocus");
            } else {
                this.soBoxlistShow = false;
                document.querySelector(".bingBg").classList.remove("bingBgBlack");
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
                oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" +
                    vm.soBoxtext +
                    "&cb=callback";
                // 添加链接及回调函数
                document.body.appendChild(oScript);
                document.body.removeChild(oScript);
            }
        },
        // 搜索框数量设置
        soBoxlistUpdate(value) {
            let vm = this;
            vm.soBoxlistShowNum = value;
            vm.$message.success(`设置成功，当前显示${this.soBoxlistShowNum}个！`);
            vm.saveStorage();
        },
        // Storage 操作
        saveStorage() {
            let vm = this;
            let saveData = {
                updateStorage: vm.updateStorage, // 用户是否允许操作 Storage
                soBoxlistShowNum: vm.soBoxlistShowNum, // 搜索结果数量
            }
            // 是否存入 Storage
            if (vm.updateStorage) {
                $stor.storage.set("IceCream", saveData);
            }
            // 存入 session
            $stor.session.set("IceCream", saveData);
        },
    }
})