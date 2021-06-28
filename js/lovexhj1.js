import $stor from './lovexhj2.js'

new Vue({
    el: '#Search',
    data: {
        version: "0.1.0", // 版本
        initDialog: true, // 初始化窗口显示
        soBoxtext: "", // 输入框内容
        soBoxtextCache: "", // 输入框临时内容
        soBoxlist: [], // 搜索结果
        soBoxlistShow: false, // 搜索结果显示
        leftBar: false, // 左侧菜单是否打开
        tabsActive: 'option', // 左侧菜单默认选择项
        bingData: [], // bing 背景数据
        bingIndex: 0, // bing 背景当前显示
        openApp: false, // 网站导航是否打开
        searchBoxFocus: false, // 搜索框是否聚焦
        time: new Date().getFullYear(),
        searchSelectIndex: -1, // 搜索结果选中索引
        // 链接数据
        LinkList: [{
                navName: "实用工具1",
                links: [{
                        name: "名字",
                        content: "介绍",
                        img: "https://infinityicon.infinitynewtab.com/user-share-icon/6e49210c084629259f22609980c48ecf.png"
                    },
                    {
                        name: "名字",
                        content: "介绍",
                        img: "https://infinityicon.infinitynewtab.com/user-share-icon/6e49210c084629259f22609980c48ecf.png"
                    }
                ]
            },
            {
                navName: "实用工具2",
                links: [{
                        name: "名字",
                        content: "介绍",
                        img: "https://infinityicon.infinitynewtab.com/user-share-icon/6e49210c084629259f22609980c48ecf.png"
                    },
                    {
                        name: "名字",
                        content: "介绍",
                        img: "https://infinityicon.infinitynewtab.com/user-share-icon/6e49210c084629259f22609980c48ecf.png"
                    }
                ]
            }
        ],
        soSelect: false, // 选择引擎界面是否打开
        soSelectAdd: false, // 添加搜索引擎界面是否打开
        // 准备添加的搜索引擎
        soAdd: {
            name: 'baidu',
            icon: 'https://www.baidu.com/favicon.ico',
            linkHead: 'https://www.baidu.com/s?wd='
        },
        saveDataCache: null, // 存储数据缓存
        // 存储数据
        saveData: {
            updateStorage: false, // 用户是否允许操作 Storage
            soBoxlistShowNum: 8, // 搜索结果数量
            bgLink: '', // 背景图片链接
            soIndex: 0, // 当前选中的搜索引擎
            footerText: true, // 底部文字显示
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
                    linkHead: 'https://www.google.com/search?q='
                },
                {
                    name: 'MDN',
                    icon: './images/mdn.png',
                    linkHead: 'https://developer.mozilla.org/zh-CN/search?q='
                },
            ],
        },
        // 关于
        about: {
            name: "IceCream",
            context: `<p>基于 Vue 与 ElementUI 的简约导航，开发中... ...</p>
            <p>
                开发人员：
                <a href="https://n0ts.cn/" target="_blank">@N0ts</a>
                <a href="https://lovewml.cn/" target="_blank">@Lu</a>
            </p>`
        },
        // 更新日志
        updateLog: [{
                time: "2021-6-28",
                log: [
                    "一言API加载失败问题修复",
                    "介绍重写",
                    "新增重置配置功能",
                    "菜单重写",
                ]
            }, {
                time: "2021-6-24",
                log: [
                    "搜索引擎回调重写，性能优化MAX提升",
                    "搜索结果支持上下键切换啦！",
                ]
            }, {
                time: "2021-6-21",
                log: [
                    "搜索特殊字符无效修复",
                    "自定义壁纸不显示图片信息修复",
                    "元素获取代码优化",
                ]
            }, {
                time: "2021-6-4",
                log: [
                    "壁纸修复",
                    "后端更换为Node.js",
                    "移除了毛玻璃，优化流畅体验",
                    "部分代码更新",
                    "自适应更新",
                ]
            }, {
                time: "2021-1-19",
                log: [
                    "自适应完成",
                    "菜单新增关闭按钮",
                    "版权与图片信息文字位置更改",
                    "版权与图片信息文字可开关",
                    "数据结构代码优化",
                ]
            },
            {
                time: "2020-12-27",
                log: [
                    "随机切换壁纸保存",
                ]
            },
            {
                time: "2020-12-22",
                log: [
                    "搜索功能已完善",
                    "搜索框右侧新增图标",
                    "搜索框聚焦效果增加",
                    "搜索结果动画增加",
                    "背景切换修复",
                    "背景接口失效会启用备用壁纸",
                    "背景外链链接存储",
                    "点击搜索功能",
                ]
            }
        ]
    },
    created() {
        this.initWindow(); // 初始化
    },
    mounted() {
        this.getBing(1); // bing 壁纸获取
        this.gethitokoto(); // 一言
        this.getLink(); // 获取网站列表
        this.checkRes(); // 上下键切换结果
    },
    methods: {
        // 初始化
        initWindow() {
            let vm = this;

            // 获取配置
            let storageCache = $stor.storage.get("IceCream");
            let sessionCache = $stor.session.get("IceCream");
            let cache;

            // 深拷贝存储数据
            let dataCache1 = JSON.stringify(vm.saveData);
            vm.saveDataCache = JSON.parse(dataCache1);

            // 是否存在用户配置
            if (storageCache) {
                cache = storageCache;
                vm.initDialog = false;
                vm.saveData.updateStorage = true;
            } else if (sessionCache) {
                cache = sessionCache;
                vm.initDialog = false;
                vm.saveData.updateStorage = false;
            }

            // 没有配置则初始化
            if (cache) {
                vm.saveData = cache;
            }
            this.saveStorage();
        },
        // 本地存储修改
        initDialogClose(b) {
            let vm = this;

            vm.initDialog = false;

            if (b) {
                vm.saveData.updateStorage = true;
                vm.$message.success("已开启本地存储设置");
            } else {
                vm.saveData.updateStorage = false;
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

            if (vm.saveData.updateStorage) {
                vm.initDialogClose(true);
            } else {
                vm.initDialogClose(false);
            }
        },
        // bing 壁纸
        getBing(index) {
            let vm = this;

            try {
                axios.post($stor.getAPI, {
                    "url": "https://cn.bing.com/HPImageArchive.aspx",
                    "type": "get",
                    "data": {
                        "format": "js",
                        "idx": 0,
                        "n": 8,
                        "mkt": "zh-CN"
                    }
                }).then(res => {
                    if (res.data.msg == 200) {
                        vm.bingData = res.data.data;
                    }

                    // 如果未设定则显示 bing 壁纸
                    if (vm.saveData.bgLink == "") {
                        vm.bingIndex = index - 1;
                        let bing = "https://cn.bing.com/" + vm.bingData.images[vm.bingIndex].url;
                        vm.setNowBg(bing);
                    } else {
                        // 显示设定壁纸
                        vm.setNowBg(vm.saveData.bgLink);
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
            if (vm.saveData.bgLink == "") {
                vm.setNowBg("./errorBg.jpg");
            } else {
                vm.setNowBg(vm.saveData.bgLink);
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
                    if (vm.bingIndex == vm.bingData.images.length - 1) {
                        vm.bingIndex = -1;
                    }
                    vm.saveData.bgLink = "https://cn.bing.com/" + vm.bingData.images[++vm.bingIndex].url;
                    vm.setNowBg(vm.saveData.bgLink);
                    this.saveStorage();
                } else {
                    this.getBing();
                }
            }
        },
        // 链接设置
        setBgImg() {
            let vm = this;
            if (vm.saveData.bgLink) {
                vm.setNowBg(vm.saveData.bgLink);
                vm.bingData = [];
            } else {
                vm.getBing(1);
            }
            vm.saveStorage();
        },
        // 设置 url 背景
        setNowBg(url) {
            let bgBox = this.$refs.bingBg;
            bgBox.style.background = `url(${url})`;
            bgBox.style.backgroundSize = "cover";
            bgBox.style.backgroundPosition = "center";
            bgBox.style.backgroundAttachment = "fixed";
            this.saveStorage();
        },
        // 一言API
        gethitokoto() {
            this.$http.jsonp("https://v1.hitokoto.cn?c=d&c=h&c=i&c=j&c=l").then(res => {
                this.$refs.hitokoto.innerText = JSON.parse(JSON.parse(res.body)).hitokoto;
            }, err => {
                this.gethitokoto();
            })
        },
        // 搜索框聚焦
        SoFocus(b) {
            this.soSelect = false;
            if (b) {
                this.searchBoxFocus = true;
                this.$refs.soBoxlist.classList.add("soBoxlistShow");
                this.$refs.bingBg.classList.add("bingBgBlack");
                this.$refs.soBoxtext.classList.add("soBoxtextFocus");
            } else {
                this.searchBoxFocus = false;
                this.$refs.bingBg.classList.remove("bingBgBlack");
                this.$refs.soBoxtext.classList.remove("soBoxtextFocus");
                setTimeout(() => {
                    this.$refs.soBoxlist.classList.remove("soBoxlistShow");
                }, 200);
            }
        },
        // 输入框内容处理
        SoChange(e) {
            let vm = this;

            // 获取键位
            let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
            // 无视上下按键
            if (e1 && e1.keyCode == 38 || e1 && e1.keyCode == 40) {
                return vm.soBoxtextCache = vm.soBoxtext;
            }

            // 没有内容则隐藏
            if (!vm.soBoxtext) {
                this.$refs.soBoxlist.style.height = "0px";
            }
            // 回车跳转
            if (e.keyCode == 13) {
                return this.goBaidu();
            }

            // 搜索结果选中索引修改
            vm.searchSelectIndex = -1;

            // 请求
            if (vm.soBoxtext) {
                vm.$http.jsonp(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${encodeURIComponent(vm.soBoxtext)}&cb=callback`, {
                        jsonp: 'cb'
                    })
                    .then(res => {
                        // 是否存在结果
                        if (res.data.s.length == 0) {
                            return;
                        }
                        // 数量超过时
                        if (res.data.s.length >= vm.saveData.soBoxlistShowNum) {
                            // 截取到搜索数量
                            vm.soBoxlist = res.data.s.splice(0, vm.saveData.soBoxlistShowNum);
                            // 设置结果高度
                            vm.$refs.soBoxlist.style.height = vm.saveData.soBoxlistShowNum * 40 + "px";
                        } else {
                            // 获取结果
                            vm.soBoxlist = res.data.s;
                            // 设置结果高度
                            vm.$refs.soBoxlist.style.height = vm.soBoxlist.length * 40 + "px";
                        }
                    }, err => {
                        console.log(err);
                    });
            }
        },
        // 回车跳转
        goBaidu() {
            let vm = this;
            if (vm.soBoxtext) {
                window.open(vm.saveData.so[vm.saveData.soIndex].linkHead + encodeURIComponent(vm.soBoxtext));
            } else {
                vm.$message("您还没输入内容呢");
            }
        },
        // 搜索框数量设置
        soBoxlistUpdate(value) {
            let vm = this;
            vm.saveData.soBoxlistShowNum = value;
            vm.$message.success(`设置成功，当前显示${vm.saveData.soBoxlistShowNum}个！`);
            vm.saveStorage();
        },
        // 网站导航
        openAppList() {
            // return this.$message.warning("菜单正在维护中！耐心等等啦！");
            this.openApp = !this.openApp;
        },
        // 搜索引擎打开 || 关闭
        selectLink() {
            this.soSelect = !this.soSelect;
        },
        // 搜索引擎选择
        soSelect1(index) {
            this.saveData.soIndex = index;
            this.saveStorage();
        },
        // 搜索框引擎添加 || 删除
        soSelectAddFc() {
            let vm = this;
            if (vm.soAdd.name && vm.soAdd.icon && vm.soAdd.linkHead) {
                vm.saveData.so.push(vm.soAdd);
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
            // return;
            axios.get($stor.ServerBase + "/get_nav_link").then(res => {
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
            this.$refs.appListBox.scrollTo({
                top: scrollHeight,
                behavior: "smooth"
            });
        },
        // 滚动阴影
        shadow() {
            if (this.$refs.appListBox.scrollTop > 20) {
                this.$refs.closeAppList.classList.add("closeAppListShadow");
            } else {
                this.$refs.closeAppList.classList.remove("closeAppListShadow");
            }
        },
        // 底部文字是否显示
        footerTextStatus() {
            let vm = this;
            if (vm.saveData.footerText) {
                vm.$message.success("底部文字已开启");
            } else {
                vm.$message.warning("底部文字已关闭");
            }
            vm.saveStorage();
        },
        // 上下键切换结果
        checkRes() {
            // 搜索结果
            let res;
            // 键位
            let e1;

            document.onkeydown = (e) => {
                let vm = this;

                // 是否搜索
                if (!vm.searchBoxFocus) {
                    return;
                }

                // 搜索结果获取
                res = vm.$refs.soBoxlist2;
                // 键位获取
                e1 = e || event || window.event || arguments.callee.caller.arguments[0];

                // 上下键检测
                if (e1 && e1.keyCode == 38) {
                    // 按下上箭头
                    // 索引超出判断
                    if (vm.searchSelectIndex == 0) {
                        vm.searchSelectIndex = vm.soBoxlist.length - 1;
                    } else {
                        vm.searchSelectIndex--;
                    }
                    // 结果修改
                    vm.soBoxtext = vm.soBoxlist[vm.searchSelectIndex];
                } else if (e1 && e1.keyCode == 40) {
                    // 按下下箭头
                    // 索引超出判断
                    if (vm.searchSelectIndex == vm.soBoxlist.length - 1) {
                        vm.searchSelectIndex = 0;
                    } else {
                        vm.searchSelectIndex++;
                    }
                    // 结果修改
                    vm.soBoxtext = vm.soBoxlist[vm.searchSelectIndex];
                }
            }
        },
        // hover 搜索结果
        hoverSearch(i) {
            this.searchSelectIndex = i;
        },
        // 重置设置
        reloadSetting() {
            // 用户是否允许操作 Storage 保存
            let updateStorage = this.saveData.updateStorage;

            // 深拷贝数据
            let cacheData = JSON.stringify(this.saveDataCache);
            this.saveData = JSON.parse(cacheData);

            this.saveData.updateStorage = updateStorage;

            // bing 壁纸获取
            this.getBing(1);
            // 保存新数据
            this.saveStorage();

            this.$message.success("重置成功");
        },
        // Storage 操作
        saveStorage() {
            let vm = this;

            // 是否允许存入 Storage
            if (vm.saveData.updateStorage) {
                $stor.storage.set("IceCream", vm.saveData);
            }

            // 初始化后允许存入
            if (!vm.initDialog) {
                // 存入 session
                $stor.session.set("IceCream", vm.saveData);
            }
        },
    }
})