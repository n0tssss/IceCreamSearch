<!--
 * @Author: N0ts
 * @Date: 2022-01-10 15:27:28
 * @LastEditTime: 2022-01-12 18:04:32
 * @Description: App 入口
 * @FilePath: /vue/src/App.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 背景 -->
    <background></background>
    <!-- 搜索框 -->
    <search></search>
</template>

<script setup>
import data from "./hooks/publicData/data";

/**
 * 组件
 */
import background from "./components/background/background.vue";
import search from "./components/search/search.vue";

document.documentElement.style.setProperty(
    "--fontColor",
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
    text-decoration: underline #1e90ff
    color: #1e90ff

a:hover
    opacity: 0.5

[v-cloak]
    display: none

// 统一过渡
#weather iframe,
#search .input,
#search .input img,
#search .input .el-icon,
.searchResult,
.searchResult a,
.searchChange>div
    transition: all .3s

#background,
#search .input
    transition: all .5s

// 统一圆角
#weather iframe
.searchResult,
.searchChange
    border-radius: 10px

// 卡片阴影
#weather iframe
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px

// 定位居中
#search
    position: absolute
    left: 50%
    transform: translateX(-50%)

// 白色字体阴影
#weather *,
.hitokoto
    line-height: 1.5rem
    text-shadow: 0 0 3px black
    color: white
</style>
