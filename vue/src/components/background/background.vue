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

        <!-- 导航菜单 -->
        <Menu></Menu>
    </div>
</template>

<script setup>
import weather from "../weather/weather.vue";
import Menu from "../menu/menu.vue";
import axios from "../../utils/http/axios";
import data from "../../data/data";
import { ref } from "vue";

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
const bingData = ref(null);
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
            bingData.value = res.data.images;
            // console.log("Bing 壁纸", bingData.value);

            // 获取介绍与链接
            data.saveData.bgLinkContent = bingData.value[0].copyright;
            data.saveData.bgLinkHref = bingData.value[0].copyrightlink;

            setBg("https://cn.bing.com/" + bingData.value[0].url);
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

<style scoped lang="less">
#background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.active {
    opacity: 0.5;
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    filter: blur(10px);
}
</style>
