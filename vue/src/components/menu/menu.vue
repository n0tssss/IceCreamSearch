<!--
 * @Author: N0ts
 * @Date: 2022-01-13 16:00:18
 * @LastEditTime: 2022-01-14 10:39:24
 * @Description: 导航菜单
 * @FilePath: /vue/src/components/menu/menu.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 导航菜单 -->
    <div id="menu">
        <!-- 打开菜单 -->
        <div class="openMenu" :class="{ openMenuShow: !data.leftBar }">
            <el-icon @click="data.leftBar = true"><arrow-up /></el-icon>
        </div>

        <!-- 菜单 -->
        <div class="menuBox" :class="{ menuBoxShow: data.leftBar }">
            <!-- 关闭按钮 -->
            <el-icon @click="data.leftBar = false"><arrow-down /></el-icon>
            <!-- 菜单列表 -->
            <div class="menuList" v-if="data.saveData.LinkList">
                <!-- 导航 -->
                <div class="navigation">
                    <div
                        v-for="(item, index) in data.saveData.LinkList"
                        :key="index"
                        @click="scroll('list-' + item.navName)"
                    >
                        {{ item.navName }}
                    </div>
                </div>
                <!-- 列表 -->
                <div class="list" refname="list" :ref="setRef">
                    <div
                        v-for="(item, index) in data.saveData.LinkList"
                        :key="index"
                        :refname="'list-' + item.navName"
                        :ref="setRef"
                    >
                        <!-- 标题 -->
                        <h1>{{ item.navName }}</h1>
                        <!-- itemBox -->
                        <div class="itemBox">
                            <!-- 提示 -->
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="item2.content"
                                placement="bottom"
                                v-for="(item2, index2) in item.links"
                                :key="index2"
                            >
                                <!-- content -->
                                <div @click="openHref(item2.url)">
                                    <!-- logo -->
                                    <img :src="item2.img" :alt="item2.name" />
                                    <!-- text -->
                                    <div>
                                        <p class="itemTitle">
                                            {{ item2.name }}
                                        </p>
                                        <p class="itemContent">
                                            {{ item2.content }}
                                        </p>
                                    </div>
                                </div>
                            </el-tooltip>
                        </div>
                    </div>

                    <!-- 撑开底部的盒子 -->
                    <div refname="bigBox" :ref="setRef"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";
import { onMounted } from "@vue/runtime-core";
import { ElIcon, ElTooltip } from "element-plus";
import data from "../../hooks/publicData/data";

onMounted(() => {
    // 撑开底部距离盒子高度计算
    bigBoxHeight();
});

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
 * 跳转到指定链接
 */
function openHref(url) {
    window.open(url);
}

/**
 * 滚动到指定位置
 */
function scroll(name) {
    // 需要滚动的高度
    let top = 0;

    // 计算滚动高度
    for (const key in nodes) {
        if (key == name) {
            break;
        }
        if (key.includes("list-")) {
            top += nodes[key].clientHeight;
        }
    }

    // 滚动
    nodes.list.scrollTo({
        top,
        behavior: "smooth"
    });
}

/**
 * 撑开底部距离盒子高度计算
 */
function bigBoxHeight() {
    let cache;
    for (const key in nodes) {
        if (key.includes("list-")) {
            cache = nodes[key];
        }
    }

    nodes.bigBox.style.height =
        nodes.list.clientHeight - cache.clientHeight + "px";
}
</script>

<style scoped lang="stylus">
// 导航菜单
#menu
    width: 100%
    height: 100%
    position: fixed
    bottom: 0
    left: 0

    // 打开菜单
    .openMenu
        width: 100%
        height: 130px
        background: linear-gradient(to top, black, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%)
        color: white
        font-size: 2.3rem
        display: flex
        justify-content: center
        bottom: 0
        transform: translate(-50%, 100%)

        .el-icon
            padding-top: 15px
            width: 100%
            height: 40%
            cursor: pointer

            .icon
                animation: openApp 1s ease-in-out infinite;

            @keyframes openApp
                0%
                    transform: scale(1) translateY(5px);
                    opacity: 0;

                50%
                    transform: scale(1.1);
                    opacity: 1;

                100%
                    transform: scale(1) translateY(-10px);
                    opacity: 0;

    .openMenuShow
        transform: translate(-50%, 0%)

    // 菜单
    .menuBox
        width: 90%
        height: 60%
        background-color: rgba(0, 0, 0, 0.5)
        backdrop-filter: blur(10px)
        bottom: 0
        transform: translate(-50%, 100%)
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px

        // 关闭按钮
        .el-icon
            width: 100%
            height: 50px
            color: white
            font-size: 2.3rem
            cursor: pointer

            &:hover .icon
                transform: translateY(5px)

        // 菜单列表
        .menuList
            width: 100%
            height: calc(100% - 50px)
            display: flex
            flex-wrap: nowrap
            color: white

            // 导航
            .navigation
                width: 25%
                max-width: 260px
                height: 100%
                overflow-y: scroll

                >div
                    width: 100%
                    padding: 10px 0
                    text-align: center
                    cursor: pointer

                    &:hover
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3)
                        background-color: rgba(0, 0, 0, 0.3)

            // 列表
            .list
                width: 100%
                height: 100%
                overflow-y: scroll

                >div
                    padding: 10px 30px 30px
                    box-sizing: border-box

                    >h1
                        font-size: 1.3rem
                        padding: 0 0 15px 0
                        position: relative
                        display: inline-block

                        &:after
                            content: ''
                            display: block
                            width: 50px
                            height: 3px
                            position: absolute
                            bottom: 5px
                            left: 0
                            background: rgba(255, 255, 255, 0.3)

                    .itemBox
                        display: flex
                        flex-wrap: wrap

                        >div
                            display: flex
                            width: 180px
                            cursor: pointer
                            padding: 10px
                            box-sizing: border-box

                            &:hover
                                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3)
                                background-color: rgba(0, 0, 0, 0.3)

                            img
                                width: 40px
                                height: 40px
                                object-fit: cover
                                border-radius: 50%
                                margin-right: 5px

                            >div
                                width: calc(100% - 40px)

                                .itemTitle
                                    width: 100%
                                    font-size: .8rem
                                    overflow : hidden
                                    text-overflow: ellipsis
                                    display: -webkit-box
                                    -webkit-line-clamp: 2
                                    -webkit-box-orient: vertical

                                .itemContent
                                    color: #aeaeae
                                    font-size: .6rem
                                    overflow: hidden
                                    text-overflow: ellipsis
                                    white-space: nowrap


    .menuBoxShow
        transform: translate(-50%, 0%)
</style>
