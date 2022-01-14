<!--
 * @Author: N0ts
 * @Date: 2022-01-11 10:01:25
 * @LastEditTime: 2022-01-14 11:02:19
 * @Description: 背景
 * @FilePath: /vue/src/components/background/background.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 背景 -->
    <div
        id="background"
        refname="background"
        :ref="setRef"
        :class="{ active: data.searchBoxFocus }"
    >
        <!-- 天气 -->
        <weather></weather>
    </div>
</template>

<script setup>
import axios from "../../hooks/http/axios";
import weather from "../weather/weather.vue";
import data from "../../hooks/publicData/data";

/**
 * setup
 */
loadBg(); // 加载壁纸

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
 * 加载壁纸
 */
function loadBg() {
    // 是否已经设置壁纸
    if (data.saveData.bgLink) {
        return setBg(data.saveData.bgLink);
    }

    // 获取 Bing 壁纸
    getBing();
}

/**
 * 获取 Bing 壁纸
 */
function getBing() {
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
        .then((res) => {
            data.bingData = res.data.images;
            // console.log("Bing 壁纸", data.bingData);

            // 获取介绍与链接
            data.saveData.bgLinkContent = data.bingData[0].copyright;
            data.saveData.bgLinkHref = data.bingData[0].copyrightlink;

            setBg("https://cn.bing.com/" + data.bingData[0].url);
        })
        .catch((err) => {
            console.log(err);
        });
}

/**
 * 设置背景
 */
function setBg(url) {
    nodes.background.style.background = `url(${url})`;
    nodes.background.style.backgroundSize = "cover";
    nodes.background.style.backgroundPosition = "center";
    nodes.background.style.backgroundAttachment = "fixed";
}
</script>

<style scoped lang="stylus">
#background
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0

.active
    opacity: 0.5
    transform: scale(1.05)
    -webkit-transform: scale(1.05)
    -moz-transform: scale(1.05)
    -ms-transform: scale(1.05)
    -o-transform: scale(1.05)
    filter: blur(5px)
</style>
