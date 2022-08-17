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
        <!-- <div class="optionsBox">
            <p class="title">主题色</p>
            <p class="about">设置一个喜欢的主题色</p>
            <div class="operation">
                <el-input
                    v-model="data.saveData.bgLink"
                    placeholder="请输入图片链接"
                    @change="setNowBg(saveData.bgLink)"
                ></el-input>
            </div>
            <div class="btns"></div>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import data from "@/data/data";
import notify from "@/utils/notify/notify";
import local from "@/utils/localData/local";
import { RefreshLeft } from "@element-plus/icons-vue";

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
 * 设置 url 背景
 * @param {*} url 图片 url
 */
// function setNowBg(url) {
//     // if (!url) {
//     //     return this.getBing(1);
//     // }
//     let bgBox = data.$refs.bingBg;
//     bgBox.style.background = `url(${url})`;
//     bgBox.style.backgroundSize = "cover";
//     bgBox.style.backgroundPosition = "center";
//     bgBox.style.backgroundAttachment = "fixed";
//     local.save();
// }
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
