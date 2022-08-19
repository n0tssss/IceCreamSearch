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
        :class="{
            active: data.searchBoxFocus,
            activeBlur: !data.saveData.AeroState && data.searchBoxFocus
        }"
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
import { watch } from "vue";
import notify from "@/utils/notify/notify";

/**
 * 获取 Bing 壁纸
 */
function getBing() {
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
            // 如果已经设置壁纸则跳过
            if (data.saveData.bgLink) {
                return setBg(data.saveData.bgLink);
            }

            // 设置第一张图片
            data.saveData.bingIndex = 0;
            data.saveData.bgLinkContent = data.bingData[0].copyright;
            data.saveData.bgLinkHref = data.bingData[0].copyrightlink;
            data.saveData.bgLink =
                "https://cn.bing.com/" + data.bingData[0].url;
        })
        .catch((err) => {
            notify("获取 bing 壁纸失败", 4);
        });
}
getBing();

watch(
    () => data.saveData.bgLink,
    () => {
        // 是否设置了壁纸，没设置则获取 bing
        if (data.saveData.bgSet) {
            setBg(data.saveData.bgLink);
        } else {
            getBing();
        }
    }
);

/**
 * 设置背景样式
 */
function setBg(url: string) {
    data.backgroundCss = `background: url("${url}") center center / cover fixed;`;
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

.activeBlur {
    filter: none;
    opacity: 0.3;
}
</style>
