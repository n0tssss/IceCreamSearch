<!--
 * @Author: N0ts
 * @Date: 2022-01-10 15:27:28
 * @LastEditTime: 2022-11-18 12:03:57
 * @Description: App 入口
 * @FilePath: /vue/src/App.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 背景 -->
    <background></background>

    <!-- 搜索框 -->
    <search></search>

    <!-- 设置界面 -->
    <setting></setting>

    <!-- 初始化询问 -->
    <el-dialog title="提示" v-model="data.initDialog" width="40%">
        <span
            >是否允许我们将您的设置信息存入到本地缓存，这将获得完美的体验</span
        >
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="local.initSave(false)">
                    取 消
                </el-button>
                <el-button type="primary" @click="local.initSave(true)">
                    确 定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import background from "@/components/background/background.vue";
import search from "@/components/search/search.vue";
import setting from "@/components/setting/setting.vue";
import data from "@/data/data";
import local from "@/utils/localData/local";
import { ElDialog, ElButton } from "element-plus";
import giteeUtil from "@/utils/giteeUtil";

/**
 * 初始化
 */
import init from "./utils/localData/init";

init.go();

/**
 * 设置主题色
 */
document.documentElement.style.setProperty(
    "--themeColor",
    data.saveData.themeColor
);

const code = window.location.search.match(/[^\?code=].+/g);
// if (code && !data.saveData.giteeToken) {
//     giteeUtil.getGiteeToken(
//         "641217fc99ed89b51fb44f14df6909f619263abd55fa27bc9b541d312c7efc9b"
//     );
// }
giteeUtil.getGiteeToken(
    "641217fc99ed89b51fb44f14df6909f619263abd55fa27bc9b541d312c7efc9b"
);
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    font-family: -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L",
        Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
        "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei",
        "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei,
        "WenQuanYi Zen Hei Sharp", sans-serif;
}

html,
body,
#app {
    height: 100%;
    overflow: hidden;
}

html,
body {
    min-width: 310px;
    height: 100%;
    scroll-behavior: smooth;
    background-color: black;
}

*::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

*::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
}

*::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(255, 255, 255, 0.1);
}

@media screen and (max-width: 425px) {
    * {
        font-size: 0.9rem;
    }
}

a {
    text-decoration: underline var(--themeColor);
    color: var(--themeColor);
}

a:hover {
    opacity: 0.5;
}

[v-cloak] {
    display: none;
}

// 统一过渡
#menu .menuBox .icon,
.menuList .navigation > div,
.list .itemBox > div,
#menu .menuBox .list .itemBox > div,
#menu .menuBox .menuList .addBtn,
#menu .menuBox .btns > div,
#menu .menuBox .btns,
.soItem {
    transition: all 0.1s;
}

#weather iframe,
#search,
#search .input,
#search .input img,
#search .input .el-icon,
.searchResult,
.searchResult div,
.searchChange > div,
.searchChange > div > .el-icon,
#menu .openMenu,
#menu .menuBox,
#footer *,
#setting .el-icon,
#setting .openBtn,
#setting .openBtn svg,
.optionsBox,
#style .colors > div {
    transition: all 0.3s;
}

#background,
#search .input {
    transition: all 0.5s;
}

// 统一圆角
#weather iframe,
.searchResult,
.searchChange,
#menu .menuBox,
.list .itemBox > div,
.optionsBox,
#search .input,
#search,
#setting .openBtn {
    border-radius: 10px;
}

// 卡片阴影
#weather iframe {
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
}

// 定位居中
#search,
#menu .openMenu,
#menu .menuBox {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

// 白色字体阴影
#weather *,
.hitokoto,
#footer p {
    line-height: 1.5rem;
    text-shadow: 0 0 3px black;
    color: white;
}

// element ui
.el-dialog {
    width: 600px;
}

.el-dialog .el-dialog__body {
    padding: 10px 20px 30px;
}

.el-overlay {
    backdrop-filter: blur(10px);
}

.el-tabs__item.is-active {
    color: var(--themeColor) !important;
}

.el-tabs__active-bar {
    color: var(--themeColor) !important;
    background-color: var(--themeColor) !important;
}

.el-tabs__item:hover {
    color: var(--themeColor) !important;
}

.el-switch.is-checked .el-switch__core {
    border-color: var(--themeColor) !important;
    background-color: var(--themeColor) !important;
}

.el-button {
    background-color: var(--themeColor) !important;
    border-color: var(--themeColor) !important;
}

.el-button:hover {
    opacity: 0.8;
}

.el-notification {
    border: none !important;
    background: rgba(255, 255, 255, 0.8) !important;
    // backdrop-filter: blur(10px) !important;

    .el-notification__closeBtn {
        color: #303133;
    }

    .el-notification__content p {
        color: rgb(59, 59, 59);
    }
}

@media screen and (max-width: 980px) {
    .el-dialog {
        width: 60% !important;
    }
}

@media screen and (max-width: 650px) {
    .el-dialog {
        width: 80% !important;
    }
}
</style>
