let $stor = window.localStorage;

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
        soBoxlistShowNum: 5, // 搜索结果数量
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
            let iceCream = vm.getStorage("IceCream");
            // 允许操作则不提示
            if(iceCream && iceCream.updateStorage) {
                vm.initDialog = false;
                vm.soBoxlistShowNum = iceCream.soBoxlistShowNum;
            }
        },
        // 初始化判断
        initDialogClose(b) {
            let vm = this;
            if(b) {
                vm.updateStorage = true;
                vm.saveStorage();
            } else {
                vm.updateStorage = false;
                vm.clearStorage();
            }
            vm.initDialog = false;
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
                oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + vm.soBoxtext + "&cb=callback";
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
            vm.clearStorage();
            if(vm.updateStorage) {
                vm.setStorage("IceCream", {
                    updateStorage: vm.updateStorage, // 是否初始化
                    soBoxlistShowNum: vm.soBoxlistShowNum, // 搜索结果数量
                });
            }
        },
        setStorage(value, params) {
            params = JSON.stringify(params);
            $stor.setItem(value, params);
        },
        getStorage(value) {
            return this.StorageData = JSON.parse($stor.getItem(value));
        },
        clearStorage() {
            this.StorageData = {};
            return $stor.clear();
        }
    }
})