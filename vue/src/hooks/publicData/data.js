/*
 * @Author: N0ts
 * @Date: 2022-01-11 10:28:43
 * @LastEditTime: 2022-01-11 10:41:32
 * @Description: 存入缓存的数据
 * @FilePath: /vue/src/hooks/publicData/saveData.js
 * @Mail：mail@n0ts.cn
 */

import { reactive } from "vue";
import updateLog from "../updateLog/updateLog";

export default reactive({
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
    defaultColors: [
        "#1e90ff",
        "#ff4757",
        "#ff7f50",
        "#eccc68",
        "#2ed573",
        "#5352ed",
        "#747d8c",
        "#2f3542"
    ],
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
});
