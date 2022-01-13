<!--
 * @Author: N0ts
 * @Date: 2022-01-11 10:23:17
 * @LastEditTime: 2022-01-13 11:49:47
 * @Description: 搜索框组件
 * @FilePath: /vue/src/components/search/search.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 搜索框组件 -->
    <div id="search">
        <!-- input 输入框 -->
        <div class="input" :class="{ searchActive: data.searchBoxFocus }">
            <!-- 搜索引擎 logo -->
            <img
                @click="data.soSelect = !data.soSelect"
                :src="data.saveData.so[data.saveData.soIndex].icon"
                alt="searchLogo"
            />
            <!-- 搜索框 -->
            <input
                type="text"
                placeholder="搜点什么..."
                v-model="data.soBoxtext"
                @focus="data.searchBoxFocus = true"
                @blur="data.searchBoxFocus = false"
                @keyup="searchGo"
            />
            <!-- 搜索图标 -->
            <el-icon @click="enter"><Search /></el-icon>
        </div>

        <!-- 搜索结果 -->
        <div
            class="searchResult"
            refname="searchResult"
            :ref="setRef"
            :style="'height:' + data.soBoxHeight + 'px;'"
            :class="{
                searchResultAction: data.soBoxHeight != 0,
                searchResultClose: !data.searchBoxFocus
            }"
        >
            <div
                @mousedown="goHref(item)"
                @mouseover="data.searchSelectIndex = index"
                @mouseout="data.searchSelectIndex = -1"
                :class="{ searchResultActive: data.searchSelectIndex == index }"
                v-for="(item, index) in data.soBoxlist"
                :key="index"
            >
                {{ item }}
            </div>
        </div>

        <!-- 搜索引擎切换 -->
        <div
            class="searchChange"
            :class="{ searchChangeActive: data.soSelect }"
            v-if="data.saveData.so"
        >
            <!-- 搜索引擎列表 -->
            <div
                v-for="(item, index) in data.saveData.so"
                :key="index"
                :class="{
                    searchChangeDivActive: index == data.saveData.soIndex
                }"
                @click="data.saveData.soIndex = index"
            >
                <!-- logo -->
                <img :src="item.icon" :alt="item.icon" />
                <!-- 内容 -->
                <p>{{ item.name }}</p>
            </div>
        </div>

        <!-- 一言 -->
        <div class="hitokoto" id="hitokoto">{{ data.hitokoto }}</div>
    </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, watch } from "vue";
import { ElIcon } from "element-plus";
import data from "../../hooks/publicData/data";
import axios from "../../hooks/http/axios";
import notify from "../../hooks/notify/notify";

/**
 * 元素节点
 */
let nodes = {};

/**
 * 获取 ref 元素
 */
function setRef(item) {
    // 如果元素不存在 或 id 与 refname 都不存在的话
    if (!item || !item.attributes.refname.value) {
        return;
    }

    // 添加到元素节点 优先取 id
    nodes[item.attributes.refname.value] = item;
}

/**
 * setup
 */
gethitokoto(); // 获取一言

/**
 * 加载完毕
 */
onMounted(() => {
    /**
     * 一言复制
     */
    // eslint-disable-next-line no-undef
    new ClipboardJS("#hitokoto", {
        text: () => {
            notify("一言已复制", 1);
            return data.hitokoto;
        }
    });
});

data.saveData.so = [
    {
        name: "百度",
        icon: require("../../assets/images/baidu.png"),
        linkHead: "https://www.baidu.com/s?wd="
    },
    {
        name: "必应",
        icon: require("../../assets/images/bing.png"),
        linkHead: "https://cn.bing.com/search?q="
    },
    {
        name: "谷歌",
        icon: require("../../assets/images/google.png"),
        linkHead: "https://www.google.com/search?q="
    },
    {
        name: "MDN",
        icon: require("../../assets/images/mdn.png"),
        linkHead: "https://developer.mozilla.org/zh-CN/search?q="
    },
    {
        name: "哔哩哔哩",
        icon: require("../../assets/images/bilibili-fill.png"),
        linkHead: "https://search.bilibili.com/all?keyword="
    }
];

/**
 * 获取一言
 */
function gethitokoto() {
    // 一言是否展示
    if (!data.saveData.hitokotoShow) {
        return;
    }

    // 一言类型选择
    let type = "?";
    data.saveData.hitokotoIndex.forEach((item) => {
        type += item == "all" ? "" : `c=${item}&`;
    });

    // 类型判断
    axios
        .post("https://cors.lovewml.cn/cors", {
            url: "https://v1.hitokoto.cn" + type,
            method: "GET"
        })
        .then((res) => {
            // data.hitokoto = `「${res.data.hitokoto}」- ${res.data.from}`;
            data.hitokoto = `${res.data.hitokoto}`;
        })
        .catch((err) => {
            console.log(err);
        });
}
/**
 * 搜索框输入文字
 */
function searchGo(e) {
    // 获取键位
    let e1 = e || event || window.event || arguments.callee.caller.arguments[0];

    // 无视上下按键
    if ((e1 && e1.keyCode == 38) || (e1 && e1.keyCode == 40)) {
        return (data.soBoxtextCache = data.soBoxtext);
    }

    // 回车跳转搜索
    if (e.keyCode == 13) {
        return enter();
    }

    // 搜索结果选中索引修改
    data.searchSelectIndex = -1;

    // 是否有内容
    if (!data.soBoxtext) {
        data.soBoxHeight = 0;
        return (data.soBoxlist = []);
    }

    // 请求百度获取搜索匹配结果
    axios
        .post("https://cors.lovewml.cn/cors", {
            url: `https://suggestion.baidu.com/su?wd=${data.soBoxtext}`,
            method: "GET",
            responseType: "arraybuffer"
        })
        .then((res) => {
            // 是否有内容
            if (!data.soBoxtext) {
                data.soBoxHeight = 0;
                return (data.soBoxlist = []);
            }

            // 提取搜索结果转为数组
            res.data = res.data.match(/\[.+\]/g)[0];
            if (res.data) {
                res.data = JSON.parse(res.data);
            }
            data.soBoxlist = res.data;

            // 结果框高度计算
            data.soBoxHeight =
                (data.soBoxlist.length > data.saveData.soBoxlistShowNum
                    ? data.saveData.soBoxlistShowNum
                    : data.soBoxlist.length) * 40;

            // console.log("搜索结果", data.soBoxlist);
        })
        .catch(() => {
            data.soBoxHeight = 0;
            return (data.soBoxlist = []);
        });
}

/**
 * 回车跳转搜索
 */
function enter() {
    if (!data.soBoxtext) {
        return notify("您还没有输入搜索内容呢", 3);
    }
    goHref(data.soBoxtext);
}

/**
 * 跳转搜索
 */
function goHref(item) {
    window.open(
        data.saveData.so[data.saveData.soIndex].linkHead +
            encodeURIComponent(item)
    );
}

/**
 * 当搜索框聚焦时关闭搜索引擎选择框
 */
watch(
    () => data.searchBoxFocus,
    () => {
        if (data.searchBoxFocus) {
            data.soSelect = false;
        }
    }
);
</script>

<style scoped lang="stylus">
// 搜索框组件
#search
    width: 50%
    height: 50px
    top: 30%
    backdrop-filter: blur(5px)

    // input 输入框
    .input
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: space-between
        border-radius: 50px
        padding: 0 20px
        opacity: .3
        user-select: text !important;
        -webkit-user-select: text !important;
        background: white
        backdrop-filter: blur(5px)
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px
        box-sizing: border-box

        &:hover
            opacity: .5

        img
            width: 25px
            cursor: pointer

            &:hover
                transform: scale(1.1)

        input
            width 100%
            margin: 0 15px
            height: 100%
            background: transparent
            border: none
            outline: none
            font-size: 1rem
            user-select: text !important;
            -webkit-user-select: text !important;

        .el-icon
            transform: scale(1.3)
            cursor: pointer

            &:hover
                transform: scale(1.5)

    .searchActive
        opacity: 1 !important
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    // 搜索结果
    .searchResult
        width: 100%
        background: white
        overflow: hidden
        opacity: 0

        div
            height: 40px
            line-height: 40px
            padding: 0 20px
            color: #424242
            cursor: pointer

            &:hover
                opacity: 1

        .searchResultActive
            background-color: rgb(230, 230, 230);
            padding: 0 25px
            color: black

    .searchResultAction
        margin-top: 10px
        opacity: 1

    .searchResultClose
        height: 0 !important

    // 搜索引擎切换
    .searchChange
        width: 100%
        height: 0
        background: white
        overflow: hidden
        display: flex
        flex-wrap: wrap
        box-sizing: border-box
        padding: 0 20px
        opacity: 0
        visibility: hidden
        transition: all .1s

        >div
            display: flex
            height: 55px
            justify-content: center
            flex-wrap: wrap
            opacity: .5
            transform: scale(.9)
            cursor: pointer

            img
                width: 30px
                height: 30px

            p
                width: 100%
                text-align: center
                font-size: .8rem

            &:hover
                opacity: 1

        .searchChangeDivActive
            color: var(--themeColor)
            transform: scale(1)
            opacity: 1

    .searchChangeActive
        height: auto
        opacity: 1
        margin-top: 10px
        padding: 10px 20px
        visibility: visible

    // 一言
    .hitokoto
        width: 100%
        text-align: center
        cursor: pointer
        margin-top: 10px
</style>
