<!--
 * @Author: N0ts
 * @Date: 2022-08-17 10:43:20
 * @Description: 设置 - 样式
 * @FilePath: /vue/src/components/setting/style.vue
 * @Mail：mail@n0ts.cn
-->
<template>
    <div id="style">
        <div class="optionsBox">
            <p class="title">主题色</p>
            <p class="about">设置一个喜欢的主题色</p>
            <div class="operation">
                <!-- 颜色预制 -->
                <div class="colors">
                    <div
                        v-for="(item, index) in data.defaultColors"
                        :key="index"
                        @click="changeThemeColor(item)"
                        :style="'background: ' + item + ';'"
                    />
                </div>
                <el-color-picker
                    v-model="data.saveData.themeColor"
                    color-format="rgb"
                    @change="changeThemeColor"
                ></el-color-picker>
            </div>
            <div class="btns"></div>
        </div>
        <div class="optionsBox">
            <p class="title">背景图</p>
            <p class="about">随机 Bing 每日壁纸或自定义喜爱的壁纸</p>
            <div class="operation">
                <el-input
                    v-model="bgUrl"
                    placeholder="请输入图片链接"
                ></el-input>
            </div>
            <div class="btns">
                <el-button type="primary" size="small" @click="saveBgUrl"
                    >保存</el-button
                >
                <el-button type="primary" size="small" @click="refreshBg"
                    >重置</el-button
                >
                <el-button type="primary" size="small" @click="nextBingBg"
                    >下一张</el-button
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import data from "@/data/data";
import notify from "@/utils/notify/notify";
import local from "@/utils/localData/local";
import { ref } from "vue";

/**
 * 主题色修改
 */
function changeThemeColor(color: string) {
    if (color) {
        data.saveData.themeColor = color;
    }
    document.documentElement.style.setProperty(
        "--themeColor",
        data.saveData.themeColor
    );
    local.save();
}

/**
 * 背景图 url
 */
const bgUrl = ref("");

/**
 * 保存背景图
 */
function saveBgUrl() {
    data.saveData.bgLink = bgUrl.value;
    local.save();
    notify("背景图设置成功", 1);
}

/**
 * 重置背景图
 */
function refreshBg() {
    bgUrl.value = "";
    data.saveData.bgLink = "";
    local.save();
    notify("背景图重置成功", 1);
}

/**
 * 下一张 bing 壁纸
 */
function nextBingBg() {
    data.bingIndex++;
    if (data.bingIndex == data.bingData.length) {
        data.bingIndex = 0;
    }
    data.saveData.bgLinkContent = data.bingData[data.bingIndex].copyright;
    data.saveData.bgLinkHref = data.bingData[data.bingIndex].copyrightlink;
    data.saveData.bgLink =
        "https://cn.bing.com/" + data.bingData[data.bingIndex].url;
    bgUrl.value = data.saveData.bgLink;
    local.save();
}
</script>

<style lang="less">
#style {
    /* 颜色预制 */
    .colors {
        display: flex;
        margin-bottom: 5px;

        > div {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            -ms-border-radius: 50%;
            -o-border-radius: 50%;
            cursor: pointer;

            &:hover {
                transform: scale(1.2);
                -webkit-transform: scale(1.2);
                -moz-transform: scale(1.2);
                -ms-transform: scale(1.2);
                -o-transform: scale(1.2);
            }
        }
    }
}
</style>
