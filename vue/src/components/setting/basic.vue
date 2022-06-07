<!--
 * @Author: N0ts
 * @Date: 2022-04-09 14:00:04
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
    </div>
</template>
<script setup>
import data from "../../data/data";
import { ElSwitch } from "element-plus";
import stor from "../../utils/storage/storage";
import notify from "../../utils/notify/notify";
import local from "../../utils/localData/local";

/**
 * 本地存储开关
 */
function StorageStatus() {
    if (data.saveData.updateStorage) {
        notify("已开启本地存储设置", 1);
    } else {
        stor.storage.remove("IceCream");
        notify("已关闭本地存储设置，设置里面还可以开启哦", 3);
    }
    // 记住用户设置
    local.save();
}
</script>
<style scoped lang="less">
#basic {
}
</style>
