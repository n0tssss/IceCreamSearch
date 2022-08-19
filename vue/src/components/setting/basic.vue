<!--
 * @Author: N0ts
 * @Date: 2022-08-16 15:06:38
 * @Description: 设置 - 基本
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
                    @change="
                        saveAndNotify(
                            [
                                '已开启本地存储设置',
                                '已关闭本地存储设置，设置里面还可以开启哦'
                            ],
                            data.saveData.updateStorage
                        )
                    "
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
                    @change="
                        saveAndNotify(
                            ['已开启底部文案展示', '已关闭底部文案展示'],
                            data.saveData.footerText
                        )
                    "
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
                    @change="
                        saveAndNotify(
                            ['已开启一言', '已关闭一言'],
                            data.saveData.hitokotoShow
                        )
                    "
                >
                </el-switch>
            </div>
        </div>
        <div class="optionsBox">
            <p class="title">一言类型</p>
            <p class="about">选择一言的类型</p>
            <div class="operation">
                <el-select
                    v-model="data.saveData.hitokotoIndex"
                    multiple
                    @change="changeHitokoto"
                >
                    <el-option
                        v-for="item in data.hitokotoConfig"
                        :key="item[1]"
                        :label="item[0]"
                        :value="item[1]"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="btns">
                <el-button
                    type="primary"
                    size="small"
                    :icon="RefreshLeft"
                    @click="reloadHitokoto"
                    >恢复默认</el-button
                >
            </div>
        </div>
        <div class="optionsBox">
            <p class="title">网址导航</p>
            <p class="about">是否开启网址导航</p>
            <div class="operation">
                <el-switch
                    v-model="data.saveData.openAppListShow"
                    active-color="#13ce66"
                    @change="
                        saveAndNotify(
                            ['网址导航已开启', '网址导航已关闭'],
                            data.saveData.openAppListShow
                        )
                    "
                >
                </el-switch>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import data from "@/data/data";
import notify from "@/utils/notify/notify";
import local from "@/utils/localData/local";
import { RefreshLeft } from "@element-plus/icons-vue";

/**
 * 一言类型修改
 */
function changeHitokoto() {
    let length = data.saveData.hitokotoIndex.length;
    // 最后一项时则缓存
    if (length == 1) {
        return (data.saveData.hitokotoLastData =
            data.saveData.hitokotoIndex[0]);
    }
    // 选择了其他时不选择默认选项
    if (length > 1 && data.saveData.hitokotoIndex.includes("all")) {
        notify("点击恢复默认即可随机", 3);
        data.saveData.hitokotoIndex.splice(
            data.saveData.hitokotoIndex.indexOf("all"),
            1
        );
    }
    // 只有最后一项时无法移除
    if (length == 0) {
        notify("至少得选择一个哦~", 2);
        data.saveData.hitokotoIndex.push(data.saveData.hitokotoLastData);
    }
}

/**
 * 一言恢复默认
 */
function reloadHitokoto() {
    data.saveData.hitokotoIndex = ["all"];
    notify("一言已恢复默认类型", 1);
}

/**
 * 保存配置并提示
 */
function saveAndNotify(msg: Array<string>, type: boolean) {
    notify(type ? msg[0] : msg[1], type ? 1 : 3);
    local.save();
}
</script>
<style scoped lang="less"></style>
