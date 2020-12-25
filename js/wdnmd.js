import $stor from './wdnmd2.js'

new Vue({
    el: '#Search',
    data: {
        initDialog: true, // 初始化窗口显示
        updateStorage: false, // 用户是否允许操作 Storage
        soBoxtextDom: document.querySelector("#soBoxtext"), // 输入框获取
        soBoxlistDom: document.querySelector("#soBoxlist"), // 结果获取
        soBoxtext: '', // 输入框内容
        soBoxlist: [], // 搜索结果
        soBoxlistShow: false, // 搜索结果显示
        soBoxlistShowNum: 8, // 搜索结果数量
        leftBar: false, // 左侧菜单是否打开
        tabsActive: 'option', // 左侧菜单默认选择项
        bingData: [], // bing 背景数据
        bgLink: '', // 背景图片链接
        bingIndex: 0, // bing 背景当前显示
        openApp: false, // 网站导航是否打开
        // 链接数据
        LinkList: [],
        // 搜索引擎
        so: [{
            name: '百度',
            icon: './images/baidu.png',
            linkHead: 'https://www.baidu.com/s?wd='
        },
        {
            name: '必应',
            icon: './images/bing.png',
            linkHead: 'https://cn.bing.com/search?q='
        },
        {
            name: '谷歌',
            icon: './images/google.png',
            linkHead: 'http://www.goole.com/search?q='
        },
        ],
        soIndex: 1, // 当前选中的搜索引擎
        soSelect: false, // 选择引擎界面是否打开
        soSelectAdd: false, // 添加搜索引擎界面是否打开
        // 准备添加的搜索引擎
        soAdd: {
            name: 'baidu',
            icon: 'https://www.baidu.com/favicon.ico',
            linkHead: 'https://www.baidu.com/s?wd='
        },
    },
    created() {
        this.initWindow(); // 初始化
        this.getBing(1); // bing 壁纸获取
        this.gethitokoto(); // 一言
        this.getLink(); // 获取网站列表
    },
    methods: {
        // 初始化
        initWindow() {
            let vm = this;
            let storageCache = $stor.storage.get("IceCream");
            let sessionCache = $stor.session.get("IceCream");
            // 是否存在用户配置
            if (storageCache) {
                vm.initDialog = false;
                vm.updateStorage = true;
                vm.soBoxlistShowNum = storageCache.soBoxlistShowNum;
                vm.bgLink = storageCache.bgLink;
                vm.soIndex = storageCache.soIndex;
                vm.so = storageCache.so;
            } else if (sessionCache) {
                vm.initDialog = false;
                vm.updateStorage = false;
                vm.soBoxlistShowNum = sessionCache.soBoxlistShowNum;
                vm.bgLink = sessionCache.bgLink;
                vm.soIndex = sessionCache.soIndex;
                vm.so = sessionCache.so;
            }
            this.saveStorage();
        },
        // 本地存储修改
        initDialogClose(b) {
            let vm = this;
            vm.initDialog = false;
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
        // bing 壁纸
        getBing(index) {
            let vm = this;
            try {
                axios.post($stor.ServerBase, {
                    "url": "https://cn.bing.com/HPImageArchive.aspx",
                    "format": "js",
                    "idx": 0,
                    "n": 8,
                    "mkt": "zh-CN"
                }).then(res => {
                    if (res.status == 200) {
                        vm.bingData = res.data;
                    }
                    // 如果未设定则显示 bing 壁纸
                    if (vm.bgLink == "") {
                        vm.bgLink = "";
                        vm.bingIndex = index - 1;
                        let bing = "https://cn.bing.com/" + vm.bingData.images[vm.bingIndex].url;
                        vm.setNowBg(bing);
                    } else {
                        // 显示设定壁纸
                        vm.setNowBg(vm.bgLink);
                    }
                }, err => {
                    vm.error();
                })
            } catch (err) {
                vm.error();
            }
        },
        // 壁纸错误
        error() {
            let vm = this;
            // 如果壁纸接口拉闸则调用本地背景
            this.$message.error("壁纸有点脾气罢工了，请联系网站管理员查看");
            if (vm.bgLink == "") {
                vm.setNowBg("./errorBg.jpg");
            } else {
                vm.setNowBg(vm.bgLink);
            }
        },
        // 背景图片设置
        // 判断选择
        selectBgImg(index) {
            let vm = this;
            // 打开外链网站
            if (index == 1) {
                window.open("https://imgchr.com/", "_blank");
            } else if (index == 2) {
                // 随机 bing
                if (vm.bingData.length != 0) {
                    vm.bgLink = "";
                    if (vm.bingIndex == vm.bingData.images.length - 1) {
                        vm.bingIndex = -1;
                    }
                    vm.setNowBg("https://cn.bing.com/" + vm.bingData.images[++vm.bingIndex].url);
                    this.saveStorage();
                } else {
                    this.getBing();
                }
            }
        },
        // 链接设置
        setBgImg() {
            if (this.bgLink) {
                this.setNowBg(this.bgLink);
            } else {
                this.getBing(1);
            }
            this.saveStorage();
        },
        // 设置 url 背景
        setNowBg(url) {
            let bgBox = document.querySelector(".bingBg");
            bgBox.style.background = `url(${url})`;
            bgBox.style.backgroundSize = "cover";
            bgBox.style.backgroundPosition = "center";
            bgBox.style.backgroundAttachment = "fixed";
        },
        // 一言API
        gethitokoto() {
            axios.get("https://v1.hitokoto.cn").then(res => {
                document.querySelector("#hitokoto").innerText = res.data.hitokoto;
            })
        },
        // 搜索框聚焦
        SoFocus(b) {
            this.soSelect = false;
            if (b) {
                document.querySelector(".soBoxlist").classList.add("soBoxlistShow");
                document.querySelector(".bingBg").classList.add("bingBgBlack");
                document.querySelector(".soBoxtext").classList.add("soBoxtextFocus");
            } else {
                document.querySelector(".bingBg").classList.remove("bingBgBlack");
                document.querySelector(".soBoxtext").classList.remove("soBoxtextFocus");
                setTimeout(() => {
                    document.querySelector(".soBoxlist").classList.remove("soBoxlistShow");
                }, 200);
            }
        },
        // 输入框内容处理
        SoChange(e) {
            let vm = this;
            // 清空结果
            document.querySelector("#soBoxlist").innerHTML = "";
            // 没有内容则隐藏
            if (!vm.soBoxtext) {
                document.querySelector(".soBoxlist").style.height = "0px";
            }
            // 回车跳转
            if (e.keyCode == 13) {
                this.goBaidu();
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
        // 回车跳转
        goBaidu() {
            let vm = this;
            if (vm.soBoxtext) {
                window.open(vm.so[vm.soIndex].linkHead + vm.soBoxtext)
            } else {
                vm.$message("您还没输入内容呢");
            }
        },
        // 搜索框数量设置
        soBoxlistUpdate(value) {
            let vm = this;
            vm.soBoxlistShowNum = value;
            vm.$message.success(`设置成功，当前显示${this.soBoxlistShowNum}个！`);
            vm.saveStorage();
        },
        // 网站导航
        openAppList() {
            let vm = this;
            vm.openApp = !vm.openApp;

        },
        // 搜索引擎打开
        selectLink() {
            let vm = this;
            vm.soSelect = !vm.soSelect;
            vm.saveStorage();
        },
        // 搜索引擎选择
        soSelect1(index) {
            let vm = this;
            vm.soIndex = index;
            vm.saveStorage();
        },
        // 搜索框引擎添加 || 删除
        soSelectAddFc() {
            let vm = this;
            if (vm.soAdd.name && vm.soAdd.icon && vm.soAdd.linkHead) {
                vm.so.push(vm.soAdd);
                vm.soAdd = {
                    name: '',
                    icon: '',
                    linkHead: ''
                };
                vm.$message.success("添加成功");
                vm.saveStorage();
                vm.soSelectAdd = false;
            } else {
                vm.$message.error("请填写全部选项");
            }
        },
        // 获取网站列表
        getLink() {
            axios.get("http://192.168.1.110:8081/get_nav_link").then(res => {
                if (res.status == 200) {
                    this.LinkList = res.data.data;
                }
            }, err => {
                console.log(err);
            })
        },
        // 网站列表菜单
        scrollMenu(index) {
            // 需滚动的位置
            let scrollHeight = 0;
            // 获取各分类
            let appListClass = document.querySelectorAll(".appListClass");
            // 计算滚动高度
            for (let i = 0; i < index; i++) {
                scrollHeight += appListClass[i].clientHeight;
            }
            // 开始滚动
            if (scrollHeight != 0) {
                scrollHeight += 30;
            }
            document.querySelector(".appListBox").scrollTo({
                top: scrollHeight,
                behavior: "smooth"
            });
        },
        // 滚动阴影
        shadow() {
            if (document.querySelector(".appListBox").scrollTop > 20) {
                document.querySelector(".closeAppList").classList.add("closeAppListShadow");
            } else {
                document.querySelector(".closeAppList").classList.remove("closeAppListShadow");
            }
        },
        // Storage 操作
        saveStorage() {
            let vm = this;
            let saveData = {
                updateStorage: vm.updateStorage, // 用户是否允许操作 Storage
                soBoxlistShowNum: vm.soBoxlistShowNum, // 搜索结果数量
                bgLink: vm.bgLink, // 背景图片外链
                so: vm.so, // 搜索引擎
                soIndex: vm.soIndex, // 当前选中的搜索引擎
                soIndex: vm.soIndex, // 当前选中的搜索引擎
            }
            // 是否允许存入 Storage
            if (vm.updateStorage) {
                $stor.storage.set("IceCream", saveData);
            }
            // 初始化后允许存入
            if (!vm.initDialog) {
                // 存入 session
                $stor.session.set("IceCream", saveData);
            }
        },
    }
})