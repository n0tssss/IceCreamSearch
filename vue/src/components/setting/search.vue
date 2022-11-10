<!--
 * @Author: N0ts
 * @Date: 2022-11-10 15:57:19
 * @Description: 搜索框设置
 * @FilePath: /vue/src/components/setting/search.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <div id="searchBox">
        <div class="optionsBox">
            <p class="title">搜索框</p>
            <p class="about">搜索结果数量</p>
            <div class="operation">
                <el-input-number
                    v-model="data.saveData.soBoxlistShowNum"
                    :min="1"
                    :max="10"
                    @change="
                        saveAndNotify(
                            [
                                `设置成功，当前展示${data.saveData.soBoxlistShowNum}个`
                            ],
                            true
                        )
                    "
                />
            </div>
        </div>
        <div class="optionsBox">
            <p class="title">添加</p>
            <p class="about">添加一个搜索引擎</p>
            <div class="btns">
                <el-button type="primary" @click="data.soSelectAdd = true"
                    >添加</el-button
                >
            </div>
        </div>
        <div class="optionsBox">
            <p class="title">添加</p>
            <p class="about">添加一个搜索引擎</p>
            <div class="operation">
                <div class="tools">
                    <div
                        v-for="(item, index) in data.saveData.so"
                        :key="index"
                        class="soItem"
                        :class="{
                            soItemAction: data.saveData.soIndex == index
                        }"
                        @click="data.saveData.soIndex = index"
                    >
                        <div>
                            <el-icon
                                class="el-icon-check"
                                :class="{
                                    'el-icon-check-action':
                                        data.saveData.soIndex == index
                                }"
                                ><Check
                            /></el-icon>
                            <p>{{ item.name }}</p>
                        </div>
                        <el-icon class="el-icon-close" @click="deleteSo(index)"
                            ><Close
                        /></el-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import data from "@/data/data";
import notify from "@/utils/notify/notify";
import local from "@/utils/localData/local";
import { Check, Close } from "@element-plus/icons-vue";

/**
 * 保存配置并提示
 */
function saveAndNotify(msg: Array<string>, type: boolean) {
    notify(type ? msg[0] : msg[1], type ? 1 : 3);
    local.save();
}
/**
 * 搜索引擎删除
 */
function deleteSo(i: number) {
    // 是否允许删除
    if (data.saveData.so.length == 1) {
        return data.notify("只有最后一个啦！", "warning");
    }
    if (i == data.saveData.soIndex) {
        return data.notify("不能删除当前正在使用的搜索引擎哦！", "warning");
    }
    // 删除索引判断
    if (data.saveData.soIndex > i) {
        data.saveData.soIndex -= 1;
    }
    // 删除
    data.saveData.so.splice(i, 1);
    notify("删除成功", 1);
    local.save();
}
</script>

<style scoped lang="less">
/* 搜索 item */
.soItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px 5px 0px;
    border-radius: 5px;
    cursor: pointer;
    color: gray;
    font-size: 0.9rem;

    img {
        width: 20px;
        height: 20px;
    }

    > div {
        display: flex;
        align-items: center;
    }

    i {
        font-size: 1.2rem;
    }

    .el-icon-close {
        color: #f56c6c;
    }

    .el-icon-check {
        color: #67c23a;
        opacity: 0;
    }

    .el-icon-check-action {
        opacity: 1;
        margin-right: 5px;
    }

    .el-icon-close:hover {
        color: red;
        transform: scale(1.5) rotate(90deg);
    }
}

.soItemAction {
    background: rgb(245, 245, 245);
    padding: 5px 10px;
    color: var(--fontColor);
}
</style>
