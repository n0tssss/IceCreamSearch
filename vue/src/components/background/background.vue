<!--
 * @Author: N0ts
 * @Date: 2022-08-16 15:06:38
 * @Description: 背景
 * @FilePath: /vue/src/components/background/background.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 背景 -->
    <div
        id="background"
        refname="background"
        :style="data.backgroundCss"
        :class="{ active: data.searchBoxFocus }"
    >
        <!-- 天气 -->
        <weather></weather>

        <!-- 导航菜单 -->
        <Menu></Menu>
    </div>
</template>

<script setup lang="ts">
import weather from "../weather/weather.vue";
import Menu from "../menu/menu.vue";
import axios from "@/utils/http/axios";
import data from "@/data/data";
import { ref, watch } from "vue";

/**
 * 元素节点
 */
let nodes: any = {};

/**
 * 获取 ref 元素
 */
function setRef(item: any) {
    // 如果元素不存在 或 id 与 refname 都不存在的话
    if (!item || !item.attributes.refname.value) {
        return;
    }

    // 添加到元素节点 优先取 id
    nodes[item.attributes.refname.value] = item;
}

/**
 * 获取 Bing 壁纸
 */
function getBing() {
    // 是否已经存在壁纸
    if (data.saveData.customerBgLink) {
        return;
    }

    axios
        .post("https://api.n0ts.cn/cors", {
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
            data.saveData.bgLink =
                "https://cn.bing.com/" + data.bingData[0].url;
        })
        .catch((err) => {
            console.log(err);
        });
}
getBing();

watch(
    () => data.saveData.bgLink,
    () => {
        data.backgroundCss = `background: url("${data.saveData.bgLink}") center center / cover fixed;`;
    },
    {
        immediate: true
    }
);
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
