<!--
 * @Author: N0ts
 * @Date: 2022-01-10 15:27:28
 * @LastEditTime: 2022-01-14 11:04:31
 * @Description: App 入口
 * @FilePath: /vue/src/App.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 背景 -->
    <background></background>

    <!-- 搜索框 -->
    <search></search>

    <!-- 导航菜单 -->
    <dMenu></dMenu>

    <!-- 初始化询问 -->
    <el-dialog title="提示" v-model="data.initDialog" width="40%">
        <span
            >是否允许我们将您的设置信息存入到本地缓存，这将获得完美的体验</span
        >
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="local.initSave(false)"
                    >取 消</el-button
                >
                <el-button type="primary" @click="local.initSave(true)"
                    >确 定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import background from "./components/background/background.vue";
import search from "./components/search/search.vue";
import dMenu from "./components/menu/menu.vue";
import data from "./hooks/publicData/data";
import local from "./hooks/localStorage/local";
import { ElDialog, ElButton } from "element-plus";

/**
 * 初始化
 */
import init from "./hooks/initLocalStorage/init";
init.go();

/**
 * 设置主题色
 */
document.documentElement.style.setProperty(
    "--themeColor",
    data.saveData.themeColor
);
</script>

<style lang="stylus">
*
    margin: 0
    padding: 0
    font-family: -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC",
        "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei",
        "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    -webkit-tap-highlight-color: transparent

html,
body,
#app
    height: 100%
    overflow: hidden

html,
body
    min-width: 310px
    height: 100%
    scroll-behavior: smooth
    background-color: black

*::-webkit-scrollbar
    width: 4px
    height: 4px


*::-webkit-scrollbar-thumb
    border-radius: 5px
    background: rgba(255, 255, 255, 0.3)


*::-webkit-scrollbar-track
    border-radius: 0
    background: rgba(255, 255, 255, 0.1)


@media screen and (max-width: 425px)
    *
        font-size: 0.9rem

a
    text-decoration: underline var(--themeColor)
    color: var(--themeColor)

a:hover
    opacity: 0.5

[v-cloak]
    display: none

// 统一过渡
#menu .menuBox .icon,
.menuList .navigation>div,
.list .itemBox>div
    transition: all .1s

#weather iframe,
#search,
#search .input,
#search .input img,
#search .input .el-icon,
.searchResult,
.searchResult div,
.searchChange>div,
.searchChange>div>.el-icon,
#menu .openMenu,
#menu .menuBox,
#footer *
    transition: all .3s

#background,
#search .input
    transition: all .5s

// 统一圆角
#weather iframe
.searchResult,
.searchChange,
#menu .menuBox,
.list .itemBox>div
    border-radius: 10px

// 卡片阴影
#weather iframe
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px

// 定位居中
#search,
#menu .openMenu,
#menu .menuBox
    position: absolute
    left: 50%
    transform: translateX(-50%)

// 白色字体阴影
#weather *,
.hitokoto,
#footer p
    line-height: 1.5rem
    text-shadow: 0 0 3px black
    color: white

// element ui
.el-dialog
    width: 600px

.el-dialog .el-dialog__body
    padding: 10px 20px 30px

.el-notification
    border: none
    background: rgba(255, 255, 255, .5)
    backdrop-filter: blur(10px)

.el-notification
    .el-notification__closeBtn
        color: #303133

.el-notification__content p
    color: rgb(59, 59, 59)

@media screen and (max-width: 980px)
    .el-dialog
        width: 60% !important

@media screen and (max-width: 650px)
    .el-dialog
        width: 80% !important
</style>
