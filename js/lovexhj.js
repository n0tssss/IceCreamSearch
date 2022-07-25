/*
 * @Author: N0ts
 * @Date: 2020-12-20 21:46:10
 * @LastEditTime: 2022-07-25 21:55:25
 * @Description: 主程序
 * @FilePath: /IceCreamSearch/js/lovexhj.js
 * @Mail：mail@n0ts.cn
 */

// 本地存储封装
import $stor from "./storage.js";
// 更新日志
import updateLog from "./log.js";

// axios 拦截器
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 转圈圈的 axios - $http
const $http = axios;

/**
 * Vue
 */
new Vue({
    el: "#Search",
    data: {
        initDialog: true, // 初始化窗口显示
        updateDialog: false, // 更新提示弹窗显示
        soBoxtext: "", // 输入框内容
        soBoxtextCache: "", // 输入框临时内容
        soBoxlist: [], // 搜索结果
        soBoxlistShow: false, // 搜索结果显示
        leftBar: false, // 左侧菜单是否打开
        tabsActive: "option", // 左侧菜单默认选择项
        bingData: [], // bing 背景数据
        bingIndex: 0, // bing 背景当前显示
        openApp: false, // 网站导航是否打开
        searchBoxFocus: false, // 搜索框是否聚焦
        time: new Date().getFullYear(), // 页脚年份
        searchSelectIndex: -1, // 搜索结果选中索引
        soBoxTime: null, // 当前时间展示数据
        weatherInfo: null, // 当前天气数据
        updateLog, // 更新日志
        hitokoto: ":D 获取中...", // 一言内容
        loading: false, // 加载转圈圈
        // 主题色预制
        defaultColors: ["#1e90ff", "#ff4757", "#ff7f50", "#eccc68", "#2ed573", "#5352ed", "#747d8c", "#2f3542"],
        // 一言类型配置
        hitokotoConfig: [
            ["全部随机", "all"],
            ["动画", "a"],
            ["漫画", "b"],
            ["游戏", "c"],
            ["文学", "d"],
            ["原创", "e"],
            ["影视", "h"],
            ["诗词", "i"],
            ["网易云", "j"],
            ["哲学", "k"],
            ["抖机灵", "l"],
            ["来自网络", "f"],
            ["其他", "g"]
        ],
        // 设置按钮位置选择数据
        settingSelect: [
            {
                value: 1,
                label: "左上"
            },
            {
                value: 2,
                label: "右上"
            },
            {
                value: 3,
                label: "右下"
            },
            {
                value: 4,
                label: "左下"
            }
        ],
        // 链接数据
        LinkList: [
            {
                navName: "实用工具1",
                links: [
                    {
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
                links: [
                    {
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
            name: "",
            icon: "",
            linkHead: ""
        },
        saveDataCache: null, // 存储数据缓存
        // 存储数据
        saveData: {
            // 码云数据
            gitee: {
                GiteeToken: "", // Gitee Access Token
                giteeName: null, // 码云昵称
                giteeAvatar: null, // 码云头像
                giteeUser: null, // 码云账号
                giteeRepos: null // 码云仓库
            },
            themeColor: "#1e90ff", // 主题色
            updateStorage: false, // 用户是否允许操作 Storage
            soBoxlistShowNum: 8, // 搜索结果数量
            bgLink: "", // 背景图片链接
            bgLinkContent: "", // 背景图片介绍
            bgLinkHref: "", // 背景图片跳转
            soIndex: 0, // 当前选中的搜索引擎
            footerText: true, // 底部文字显示
            hitokotoShow: true, // 一言展示
            hitokotoIndex: ["all"], // 一言类型选择
            hitokotoLastData: "all", // 一言数据最后一个数据缓存
            settingLocation: 4, // 设置按钮位置
            AeroState: true, // 毛玻璃是否开启
            openAppListShow: true, // 下方网址导航是否显示
            updateTime: "", // 最后一次更新时间
            // 搜索引擎
            so: [
                {
                    name: "百度",
                    icon: "./images/baidu.png",
                    linkHead: "https://www.baidu.com/s?wd="
                },
                {
                    name: "必应",
                    icon: "./images/bing.png",
                    linkHead: "https://cn.bing.com/search?q="
                },
                {
                    name: "谷歌",
                    icon: "./images/google.png",
                    linkHead: "https://www.google.com/search?q="
                },
                {
                    name: "MDN",
                    icon: "./images/mdn.png",
                    linkHead: "https://developer.mozilla.org/zh-CN/search?q="
                },
                {
                    name: "哔哩哔哩",
                    icon: "./images/bilibili-fill.png",
                    linkHead: "https://search.bilibili.com/all?keyword="
                }
            ]
        },
        // 关于
        about: {
            name: "IceCream",
            context: `<p>基于 Vue 与 ElementUI 的简约起始页，正在开发中... ...</p>
            <p>
                开发人员：
                <a href="https://n0ts.cn/" target="_blank">@N0ts</a>
                <a href="https://lovewml.cn/" target="_blank">@Lu</a>
            </p>
            <p>
                本项目已开源：
                <a href="https://gitee.com/n0ts/IceCreamSearch/" target="_blank">N0ts/IceCreamSearch</a>
            </p>
            <p>有问题或者建议欢迎前往仓库给我们留言！</p>`
        }
    },
    created() {
        this.initWindow(); // 初始化

        $http.interceptors.request.use(
            (config) => {
                this.loading = true;
                return config;
            },
            (error) => {
                this.loading = false;
                return Promise.reject(error);
            }
        );
        $http.interceptors.response.use(
            (response) => {
                this.loading = false;
                return response;
            },
            (error) => {
                this.loading = false;
                return Promise.reject(error);
            }
        );
    },
    mounted() {
        this.getBing(1); // bing 壁纸获取
        this.gethitokoto(); // 一言
        this.getLink(); // 获取网站列表
        this.checkRes(); // 上下键切换结果
        // this.leftTopTime(); // 当前时间展示
        // this.getWeather(); // 获取天气
        this.changeThemeColor(); // 默认主题色
        this.copyHitokoto(); // 一言复制启用
        this.updateLogData(); // 日志格式更正

        // 是否存在 code 参数
        let code = window.location.search.match(/[^\?code=].+/g);
        if (code && !this.saveData.gitee.GiteeToken) {
            this.getGiteeToken(code[0]);
        }
    },
    methods: {
        /**
         * 初始化
         */
        initWindow() {
            let that = this;

            // 获取配置
            let storageCache = $stor.storage.get("IceCream");
            let sessionCache = $stor.session.get("IceCream");
            let cache;

            // 深拷贝存储数据
            that.saveDataCache = {
                ...that.saveData
            };

            // 是否存在用户配置
            if (storageCache) {
                cache = storageCache;
                that.initDialog = false;
                that.saveData.updateStorage = true;
            } else if (sessionCache) {
                cache = sessionCache;
                that.initDialog = false;
                that.saveData.updateStorage = false;
            }

            // 是否存在更新
            cache = this.checkVersion(cache);

            // 没有配置则初始化
            if (cache) {
                that.saveData = cache;
            }

            // 日志是否更新
            this.checkLogUpdate();

            this.saveStorage();
        },

        /**
         * 日志是否更新
         */
        checkLogUpdate() {
            // 如果时间不存在 或 与最新日志时间不一致
            if (!this.saveData.updateTime || this.saveData.updateTime != updateLog[0].time) {
                // 提示
                this.updateDialog = true;
                // 保存最新时间
                this.saveData.updateTime = updateLog[0].time;
                this.saveStorage();
            }
        },

        /**
         * 查看日志
         */
        goLog() {
            this.updateDialog = false;
            this.tabsActive = "about";
            this.leftBar = true;
        },

        /**
         * 版本是否更新
         */
        checkVersion(cache) {
            if (!cache) {
                return cache;
            }
            // 判断数据是否缺少
            if (Object.keys(cache).length == Object.keys(this.saveDataCache).length) {
                return cache;
            }
            // 遍历数据修复
            for (let key in this.saveDataCache) {
                if (!cache[key]) {
                    cache[key] = this.saveDataCache[key];
                }
            }
            return cache;
        },

        /**
         * 本地存储修改
         */
        initDialogClose(b) {
            let that = this;

            if (b) {
                that.saveData.updateStorage = true;
                this.notify("已开启本地存储设置", "success");
            } else {
                that.saveData.updateStorage = false;
                $stor.storage.remove("IceCream");
                this.notify("已关闭本地存储设置，设置里面还可以开启哦", "warning");
            }
            // 记住用户设置
            this.saveStorage();
            // 关闭窗口
            that.initDialog = false;
        },

        /**
         * 本地存储开关
         */
        StorageStatus() {
            let that = this;

            if (that.saveData.updateStorage) {
                that.initDialogClose(true);
            } else {
                that.initDialogClose(false);
            }
        },

        /**
         * 日志格式更正
         * 1：新增；2：修改；3：修复；4：移除；5：重构；
         */
        updateLogData() {
            this.updateLog = this.updateLog.map((item1) => {
                item1.log = item1.log.map((item2) => {
                    // 分割日志
                    let cache = item2.split("；");
                    // 类型
                    let type = "";
                    // 颜色
                    let color = "background: ";
                    switch (cache[0]) {
                        case "1":
                            type = "新增";
                            color += "#00cec9;";
                            break;
                        case "2":
                            type = "修改";
                            color += "#fdcb6e;";
                            break;
                        case "3":
                            type = "修复";
                            color += "#fab1a0;";
                            break;
                        case "4":
                            type = "移除";
                            color += "#d63031;";
                            break;
                        case "5":
                            type = "重构";
                            color += "#636e72;";
                            break;
                        default:
                            break;
                    }
                    // 返回
                    return {
                        type,
                        color,
                        text: cache[1]
                    };
                });
                // 返回每天日志
                return item1;
            });
            // console.log("日志：", this.updateLog);
        },

        /**
         * bing 壁纸
         * @param {*} index bing 壁纸索引
         */
        getBing(index) {
            try {
                axios
                    .post("https://cors.lovewml.cn/cors", {
                        method: "get",
                        url: "https://cn.bing.com/HPImageArchive.aspx",
                        params: {
                            format: "js",
                            idx: 0,
                            n: 8,
                            mkt: "zh-CN"
                        }
                    })
                    .then(
                        (res) => {
                            this.bingData = res.data;
                            // console.log("bing壁纸：", this.bingData);
                            // 如果未设定则显示 bing 壁纸
                            if (this.saveData.bgLink == "") {
                                this.bingIndex = index - 1;
                                // 获取图片信息
                                let img = this.bingData.images[this.bingIndex];
                                // 获取介绍与链接
                                this.saveData.bgLinkContent = img.copyright;
                                this.saveData.bgLinkHref = img.copyrightlink;
                                // 设置壁纸
                                this.setNowBg("https://cn.bing.com/" + img.url);
                            } else {
                                // 显示设定壁纸
                                this.setNowBg(this.saveData.bgLink);
                            }
                        },
                        () => {
                            this.error();
                        }
                    );
            } catch (err) {
                this.error();
            }
        },

        /**
         * 壁纸错误
         */
        error() {
            // 如果壁纸接口拉闸则调用本地背景
            this.notify("壁纸有点脾气罢工了，请联系网站管理员查看", "error");
            if (this.saveData.bgLink == "") {
                this.setNowBg("./images/errorBg.jpg");
            } else {
                this.setNowBg(this.saveData.bgLink);
            }
        },

        /**
         * 背景图片设置，判断选择
         * @param {*} index 背景设置选项
         * @returns 打开图床
         */
        selectBgImg(index) {
            // 打开外链网站
            if (index == 1) {
                return window.open("https://imgchr.com/", "_blank");
            }

            // 切换下一张 bing
            if (index == 2) {
                // 是否为最后一张
                if (this.bingIndex == this.bingData.images.length - 1) {
                    this.bingIndex = -1;
                }
                // 获取图片信息
                let img = this.bingData.images[++this.bingIndex];
                // 获取介绍与链接
                this.saveData.bgLinkContent = img.copyright;
                this.saveData.bgLinkHref = img.copyrightlink;
                this.saveData.bgLink = "https://cn.bing.com/" + img.url;
                // 设置壁纸
                this.setNowBg(this.saveData.bgLink);
                this.saveStorage();
            }

            // 切换第一涨 bing
            if (index == 3) {
                this.saveData.bgLink = "";
                this.getBing(1);
            }
        },

        /**
         * 设置 url 背景
         * @param {*} url 图片 url
         */
        setNowBg(url) {
            if (!url) {
                return this.getBing(1);
            }
            let bgBox = this.$refs.bingBg;
            bgBox.style.background = `url(${url})`;
            bgBox.style.backgroundSize = "cover";
            bgBox.style.backgroundPosition = "center";
            bgBox.style.backgroundAttachment = "fixed";
            this.saveStorage();
        },

        /**
         * 一言API
         */
        gethitokoto() {
            // 一言是否展示
            if (!this.saveData.hitokotoShow) {
                return;
            }

            // 一言类型选择
            let type = "?";
            this.saveData.hitokotoIndex.forEach((item) => {
                type += item == "all" ? "" : `c=${item}&`;
            });

            // 类型判断
            let url = "https://v1.hitokoto.cn" + type;
            this.$http.jsonp(url).then(
                (res) => {
                    this.hitokoto = JSON.parse(JSON.parse(res.body)).hitokoto;
                },
                (err) => {
                    this.gethitokoto();
                }
            );
        },

        /**
         * 取消选择一言选项时
         */
        delHitokoto() {
            let length = this.saveData.hitokotoIndex.length;
            // 最后一项时则缓存
            if (length == 1) {
                return (this.saveData.hitokotoLastData = this.saveData.hitokotoIndex[0]);
            }
            // 选择了其他时不选择默认选项
            if (length > 1 && this.saveData.hitokotoIndex.includes("all")) {
                this.notify("点击恢复默认即可随机", "warning");
                for (let i = 0; i < length; i++) {
                    if (this.saveData.hitokotoIndex[i] == "all") {
                        this.saveData.hitokotoIndex.splice(i, 1);
                        break;
                    }
                }
            }
            // 只有最后一项时无法移除
            if (length == 0) {
                this.notify("至少得选择一个哦~", "warning");
                this.saveData.hitokotoIndex.push(this.saveData.hitokotoLastData);
            }
        },

        /**
         * 重置一言选项
         */
        reloadHitokoto() {
            this.saveData.hitokotoIndex = ["all"];
            this.gethitokoto();
            this.notify("一言选项重置成功", "success");
        },

        /**
         * 保存一言选项
         */
        saveHitokoto() {
            this.gethitokoto();
            this.saveStorage();
            this.notify("一言选项保存成功", "success");
        },

        /**
         * 搜索框聚焦
         */
        SoFocus(b) {
            this.soSelect = false;
            if (b) {
                this.searchBoxFocus = true;
                this.$refs.soBoxlist.classList.add("soBoxlistShow");
                this.$refs.bingBg.classList.add("bingBgBlack");
                this.$refs.soBoxtext.classList.add("soBoxtextFocus");
                this.$refs.hitokoto.classList.remove("hitokotoActive");
            } else {
                this.searchBoxFocus = false;
                this.$refs.bingBg.classList.remove("bingBgBlack");
                this.$refs.soBoxtext.classList.remove("soBoxtextFocus");
                setTimeout(() => {
                    this.$refs.soBoxlist.classList.remove("soBoxlistShow");
                    this.$refs.hitokoto.classList.add("hitokotoActive");
                }, 200);
            }
        },

        /**
         * 输入框内容处理
         */
        SoChange(e) {
            // 获取键位
            let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
            // 无视上下按键
            if ((e1 && e1.keyCode == 38) || (e1 && e1.keyCode == 40)) {
                return (this.soBoxtextCache = this.soBoxtext);
            }

            // 没有内容则隐藏
            if (!this.soBoxtext) {
                this.soBoxlist = [];
                this.$refs.soBoxlist.style.height = "0px";
                this.$refs.hitokoto.style.transform = `translateY(0px)`;
            }
            // 回车跳转
            if (e.keyCode == 13) {
                return this.goBaidu();
            }

            // 搜索结果选中索引修改
            this.searchSelectIndex = -1;

            // 请求
            if (this.soBoxtext) {
                this.$http
                    .jsonp(
                        `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${encodeURIComponent(
                            this.soBoxtext
                        )}&cb=callback`,
                        {
                            jsonp: "cb"
                        }
                    )
                    .then((res) => {
                        // 是否存在结果
                        if (res.data.s.length == 0) {
                            return;
                        }
                        // 数量超过时
                        if (res.data.s.length >= this.saveData.soBoxlistShowNum) {
                            // 截取到搜索数量
                            this.soBoxlist = res.data.s.splice(0, this.saveData.soBoxlistShowNum);
                            // 设置结果高度
                            let heightCache = this.saveData.soBoxlistShowNum * 40;
                            this.$refs.soBoxlist.style.height = heightCache + "px";
                            this.$refs.hitokoto.style.transform = `translateY(${heightCache}px)`;
                        } else {
                            // 获取结果
                            this.soBoxlist = res.data.s;
                            // 设置结果高度
                            let heightCache = this.soBoxlist.length * 40;
                            this.$refs.soBoxlist.style.height = heightCache + "px";
                            this.$refs.hitokoto.style.transform = `translateY(${heightCache}px)`;
                        }
                    });
            }
        },

        /**
         * 回车跳转
         */
        goBaidu() {
            let that = this;
            if (that.soBoxtext) {
                window.open(that.saveData.so[that.saveData.soIndex].linkHead + encodeURIComponent(that.soBoxtext));
            } else {
                this.notify("您还没输入内容呢", "info");
            }
        },

        /**
         * 搜索框数量设置
         */
        soBoxlistUpdate(value) {
            let that = this;
            that.saveData.soBoxlistShowNum = value;
            this.notify(`设置成功，当前显示${that.saveData.soBoxlistShowNum}个！`, "success");
            that.saveStorage();
        },

        /**
         * 网站导航
         */
        openAppList() {
            this.openApp = !this.openApp;
        },

        /**
         * 搜索引擎打开 || 关闭
         */
        selectLink() {
            this.soSelect = !this.soSelect;
        },

        /**
         * 搜索引擎选择
         */
        soSelect1(index) {
            this.saveData.soIndex = index;
            this.saveStorage();
        },

        /**
         * 搜索框引擎添加
         */
        soSelectAddFc() {
            if (this.soAdd.name && this.soAdd.icon && this.soAdd.linkHead) {
                this.saveData.so.push(this.soAdd);
                this.soAdd = {
                    name: "",
                    icon: "",
                    linkHead: ""
                };
                this.notify("添加成功", "success");
                this.saveStorage();
                return (this.soSelectAdd = false);
            }
            this.notify("请填写全部选项", "error");
        },

        /**
         * 搜索引擎删除
         */
        soSelectDelFc(i) {
            // 是否允许删除
            if (this.saveData.so.length == 1) {
                return this.notify("只有最后一个啦！", "warning");
            }
            if (i == this.saveData.soIndex) {
                return this.notify("不能删除当前正在使用的搜索引擎哦！", "warning");
            }
            // 删除索引判断
            if (this.saveData.soIndex > i) {
                this.saveData.soIndex -= 1;
            }
            // 删除
            this.saveData.so.splice(i, 1);
            this.notify("删除成功", "success");
            this.saveStorage();
        },

        /**
         * 获取网站列表
         */
        getLink() {
            axios.get("https://navigation.lovewml.cn/api/getList").then((res) => {
                if (res.state == 200) {
                    this.LinkList = res.data;
                }
            });
        },

        /**
         * 网站列表菜单滚动
         */
        scrollMenu(index) {
            // 需滚动的位置
            let scrollHeight = 0;

            // 获取各分类
            let appListClass = document.querySelectorAll(".appListClass");

            // 计算滚动高度
            for (let i = 0; i < index; i++) {
                scrollHeight += appListClass[i].clientHeight;
            }
            console.log(scrollHeight);

            // 开始滚动
            this.$refs.appListBox.scrollTo({
                top: scrollHeight,
                behavior: "smooth"
            });
        },

        /**
         * 滚动阴影
         */
        shadow() {
            if (this.$refs.appListBox.scrollTop > 20) {
                this.$refs.closeAppList.classList.add("closeAppListShadow");
            } else {
                this.$refs.closeAppList.classList.remove("closeAppListShadow");
            }
        },

        /**
         * 底部文字是否显示
         */
        footerTextStatus() {
            let msg;
            if (this.saveData.footerText) {
                msg = ["底部文字已开启", "success"];
            } else {
                msg = ["底部文字已关闭", "info"];
            }
            this.notify(msg[0], msg[1]);
            this.saveStorage();
        },

        /**
         * 上下键切换结果
         */
        checkRes() {
            // 键位
            let e1;

            document.onkeydown = (e) => {
                let that = this;

                // 是否搜索
                if (!that.searchBoxFocus) {
                    return;
                }

                // 键位获取
                e1 = e || event || window.event || arguments.callee.caller.arguments[0];

                // 上下键检测
                if (e1 && e1.keyCode == 38) {
                    // 按下上箭头
                    // 索引超出判断
                    if (that.searchSelectIndex == 0) {
                        that.searchSelectIndex = that.soBoxlist.length - 1;
                    } else {
                        that.searchSelectIndex--;
                    }
                    // 结果修改
                    that.soBoxtext = that.soBoxlist[that.searchSelectIndex];
                } else if (e1 && e1.keyCode == 40) {
                    // 按下下箭头
                    // 索引超出判断
                    if (that.searchSelectIndex == that.soBoxlist.length - 1) {
                        that.searchSelectIndex = 0;
                    } else {
                        that.searchSelectIndex++;
                    }
                    // 结果修改
                    that.soBoxtext = that.soBoxlist[that.searchSelectIndex];
                }
            };
        },

        /**
         * hover 搜索结果
         * @param {*} i 索引
         */
        hoverSearch(i) {
            this.searchSelectIndex = i;
        },

        /**
         * 重置设置
         */
        reloadSetting(notify) {
            // 部分数据不需要清除
            let updateStorage = this.saveData.updateStorage;
            let gitee = this.saveData.gitee;

            // 深拷贝数据
            this.saveData = JSON.parse(JSON.stringify(this.saveDataCache));

            // 还原备份数据
            this.saveData.updateStorage = updateStorage;
            this.saveData.gitee = gitee;

            // bing 壁纸获取
            this.getBing(1);
            // 一言获取
            this.gethitokoto();
            // 保存新数据
            this.saveStorage();
            // 主题色修改
            this.changeThemeColor();

            if (notify) {
                this.notify("重置成功", "success");
            }
        },

        /**
         * 当前时间展示
         */
        leftTopTime() {
            let date;
            let year;
            let month;
            let day;
            let hours;
            let minutes;
            let seconds;
            setInterval(() => {
                date = new Date();
                year = date.getFullYear(); // 年
                month = date.getMonth() + 1; // 月
                day = date.getDate(); // 日
                hours = date.getHours(); // 时
                // 分
                minutes =
                    date.getMinutes().toString().length == 1 ? "0" + date.getMinutes().toString() : date.getMinutes();
                // 秒
                seconds =
                    date.getSeconds().toString().length == 1 ? "0" + date.getSeconds().toString() : date.getSeconds();
                this.soBoxTime = `${year}年${month}月${day}日`;
                this.soBoxTime += ` ${hours}:${minutes}:${seconds}`;
            }, 1000);
        },

        /**
         * 获取天气
         */
        getWeather() {
            axios
                .get("https://tianqiapi.com/free/day", {
                    params: {
                        appid: 75761381,
                        appsecret: "d9ooPKO7",
                        vue: 1
                    }
                })
                .then((res) => {
                    if (res.status != 200) {
                        return this.notify("天气获取失败！", "error");
                    }
                    // 图片链接替换
                    res.data.wea_img = `https://xintai.xianguomall.com/skin/durian/${res.data.wea_img}.png`;
                    this.weatherInfo = res.data;
                });
        },

        /**
         * 主题色修改
         */
        changeThemeColor(color) {
            if (color) {
                this.saveData.themeColor = color;
            }
            document.documentElement.style.setProperty("--fontColor", this.saveData.themeColor);
            this.saveStorage();
        },

        /**
         * 重置主题色
         */
        reloadThemeColor() {
            this.saveData.themeColor = this.saveDataCache.themeColor;
            this.changeThemeColor();
            this.notify("主题色重置成功", "success");
        },

        /**
         * 一言展示
         */
        changeHitokotoShow() {
            let msg = this.saveData.hitokotoShow ? ["一言已开启", "success"] : ["一言已关闭", "info"];
            this.notify(msg[0], msg[1]);
            this.saveStorage();
        },

        /**
         * 复制一言
         */
        copyHitokoto() {
            new ClipboardJS("#hitokoto", {
                text: () => {
                    this.notify("一言已复制！", "success");
                    return this.hitokoto;
                }
            });
        },

        /**
         * 毛玻璃特效开关
         */
        changeAeroState() {
            let msg = this.saveData.AeroState ? ["毛玻璃已开启", "success"] : ["毛玻璃已关闭", "info"];
            this.notify(msg[0], msg[1]);
            this.saveStorage();
        },

        /**
         * 下方网址导航显示开关
         */
        changeOpenAppListShow() {
            let msg = this.saveData.openAppListShow ? ["网址导航已开启", "success"] : ["网址导航已关闭", "info"];
            this.notify(msg[0], msg[1]);
            this.saveStorage();
        },

        /**
         * 消息弹框提示
         * @param {String} message 消息
         * @param {success, warning, info, error} type 类型
         */
        notify(message, type) {
            this.$notify({
                message,
                type,
                showClose: true
            });
        },

        /**
         * Storage 操作
         */
        saveStorage() {
            let that = this;

            // 是否允许存入 Storage
            if (that.saveData.updateStorage) {
                $stor.storage.set("IceCream", that.saveData);
            }

            // 初始化后允许存入
            if (!that.initDialog) {
                // 存入 session
                $stor.session.set("IceCream", that.saveData);
            }
        },

        /**
         * 前往码云授权
         */
        goGitee() {
            let clientId = "c41beff69a847a4ee82b1c0db28fa70ada5aa4f6546543ebee70e284dd992deb";
            let scope = "projects user_info";
            let redirectUri = "https://search.n0ts.cn/";
            window.location.href = `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        },

        /**
         * 获取码云用户 Token
         */
        getGiteeToken(code) {
            $http
                .post("https://gitee.com/oauth/token", {
                    grant_type: "authorization_code",
                    code,
                    client_id: "c41beff69a847a4ee82b1c0db28fa70ada5aa4f6546543ebee70e284dd992deb",
                    redirect_uri: "https://search.n0ts.cn/",
                    client_secret: "90fc5270dd78bf9d709bd31033134933c572f6e3b513aef9ffed89af6e687bc7"
                })
                .then((res) => {
                    this.saveData.gitee.GiteeToken = res.access_token;
                    this.saveStorage();
                    // 登陆获取用户信息
                    this.getUserInfo();
                })
                .catch((err) => {
                    this.notify("授权失败！请联系管理员！", "error");
                });
        },

        /**
         * 登陆
         */
        getUserInfo() {
            // 获取码云信息
            $http.get(`https://gitee.com/api/v5/user?access_token=${this.saveData.gitee.GiteeToken}`).then((res) => {
                // 存储码云昵称与头像
                this.saveData.gitee.giteeName = res.name;
                this.saveData.gitee.giteeAvatar = res.avatar_url;
                this.saveData.gitee.giteeUser = res.login;
                this.saveStorage();

                // 检查仓库是否存在 & 创建
                this.checkRepos();

                this.notify("登陆成功！", "success");
            });
        },

        /**
         * 检查仓库是否存在 & 创建
         */
        async checkRepos() {
            try {
                // 创建仓库
                let createRes = await $http.post("https://gitee.com/api/v5/user/repos", {
                    access_token: this.saveData.gitee.GiteeToken,
                    name: "IceCreamSearchData",
                    description: "IceCreamSearch 起始页数据同步用",
                    has_issues: "false",
                    has_wiki: "false",
                    can_comment: "false",
                    auto_init: "true",
                    private: "true"
                });
                this.saveData.gitee.giteeRepos = createRes.name;

                // 上传数据
                this.pushDataToGitee();
            } catch (err) {
                // 仓库已存在
                if (err.message.includes("422")) {
                    // 获取数据
                    this.pullDataToGitee();
                } else {
                    // 其他报错
                    this.notify("创建仓库异常！请联系管理员！", "error");
                    console.log(err);
                }
            }
        },

        /**
         * 获取 README 文件内容
         */
        getREADME() {
            return new Promise((resolve, reject) => {
                // 获取仓库 README
                $http
                    .get(`https://gitee.com/api/v5/repos/${this.saveData.gitee.giteeUser}/IceCreamSearchData/readme`, {
                        params: {
                            access_token: this.saveData.gitee.GiteeToken
                        }
                    })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        if (err.message.includes("401")) {
                            this.notify("登陆已过期！请重新登陆！", "error");
                            return this.logout(true);
                        }
                        reject(err);
                    });
            });
        },

        /**
         * 上传数据
         */
        async pushDataToGitee() {
            try {
                // 获取 README 文件内容
                let readme = await this.getREADME();

                // 上传 README
                await $http.put(
                    `https://gitee.com/api/v5/repos/${this.saveData.gitee.giteeUser}/IceCreamSearchData/contents/README.md`,
                    {
                        access_token: this.saveData.gitee.GiteeToken,
                        content: Base64.encode(JSON.stringify(this.saveData)),
                        sha: readme.sha,
                        message: "IceCreamSearch Data Update"
                    }
                );
                this.notify("数据上传成功！", "success");
            } catch (err) {
                this.notify("数据上传失败！", "error");
                console.log(err);
            }
        },

        /**
         * 获取数据
         */
        async pullDataToGitee() {
            try {
                // 获取 README 文件内容
                let readme = await this.getREADME();

                // 重置数据
                const cacheData = this.saveDataCache;
                this.saveDataCache = JSON.parse(Base64.decode(readme.content));
                // 重置设置
                this.reloadSetting();
                this.saveDataCache = cacheData;

                this.notify("数据获取成功！", "success");
            } catch (err) {
                this.notify("数据获取失败！", "error");
                console.log(err);
            }
        },

        /**
         * 注销
         */
        logout(log) {
            this.saveData.gitee = this.saveDataCache.gitee;
            this.saveStorage();
            if (!log) {
                this.notify("已注销！", "success");
            }
        }
    }
});
