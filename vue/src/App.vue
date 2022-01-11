<!--
 * @Author: N0ts
 * @Date: 2022-01-10 15:27:28
 * @LastEditTime: 2022-01-11 18:04:08
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
/**
 * 组件
 */
// 背景
import background from "./components/background/background.vue";
// 搜索框
import search from "./components/search/search.vue";
</script>

<style lang="stylus">
*
    margin: 0
    padding: 0
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
        sans-serif

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
#weather iframe
    transition: all .3s
    -webkit-transition: all .3s
    -moz-transition: all .3s
    -ms-transition: all .3s
    -o-transition: all .3s

#background
    transition: all .5s
    -webkit-transition: all .5s
    -moz-transition: all .5s
    -ms-transition: all .5s
    -o-transition: all .5s

// 统一圆角
#weather iframe
    border-radius: 10px

// 卡片阴影
#weather iframe
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px

// 定位居中
#search
    position: absolute
    left: 50%
    transform: translateX(-50%)
    -webkit-transform: translateX(-50%)
    -moz-transform: translateX(-50%)
    -ms-transform: translateX(-50%)
    -o-transform: translateX(-50%)
</style>
