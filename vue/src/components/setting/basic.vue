<!--
 * @Author: N0ts
 * @Date: 2022-08-16 15:06:38
 * @Description: 基本设置
 * @FilePath: /vue/src/components/setting/basic.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <div id="basic">
        <div class="optionsBox">
            <p class="title">本地存储</p>
            <p class="about">将您的设置存储在浏览器缓存中</p>
            <div class="operation">
                <el-switch
                    v-model="data.saveData.updateStorage"
                    active-color="#13ce66"
                    @change="StorageStatus"
                >
                </el-switch>
            </div>
        </div>
        <div class="optionsBox">
            <p class="title">底部文案</p>
            <p class="about">是否展示底部文案</p>
            <div class="operation">
                <el-switch
                    v-model="data.saveData.footerText"
                    active-color="#13ce66"
                    @change="setFooterTextDisplay"
                >
                </el-switch>
            </div>
        </div>
        <div class="optionsBox">
            <p class="title">一言</p>
            <p class="about">是否加载一言</p>
            <div class="operation">
                <el-switch
                    v-model="data.saveData.hitokotoShow"
                    active-color="#13ce66"
                    @change="setHitokotoShow"
                >
                </el-switch>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import data from "@/data/data";
// import { ElSwitch } from "element-plus";
import stor from "@/utils/storage/storage";
import notify from "@/utils/notify/notify";
import local from "@/utils/localData/local";

/**
 * 本地存储开关
 */
function StorageStatus() {
    const msg = data.saveData.hitokotoShow
        ? ["已开启本地存储设置", 1]
        : ["已关闭本地存储设置，设置里面还可以开启哦", 3];
    notify(msg[0], msg[1]);
    local.save();
}

/**
 * 底部文案开关
 */
function setFooterTextDisplay() {
    const msg = data.saveData.hitokotoShow
        ? ["已开启底部文案展示", 1]
        : ["已关闭底部文案展示", 3];
    notify(msg[0], msg[1]);
    local.save();
}

/**
 * 一言开关
 */
function setHitokotoShow() {
    const msg = data.saveData.hitokotoShow
        ? ["已开启一言", 1]
        : ["已关闭一言", 3];
    notify(msg[0], msg[1]);
    local.save();
}
</script>
<style scoped lang="less"></style>
