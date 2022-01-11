<!--
 * @Author: N0ts
 * @Date: 2022-01-11 10:23:17
 * @LastEditTime: 2022-01-11 18:03:38
 * @Description: 搜索框组件
 * @FilePath: /vue/src/components/search/search.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 搜索框组件 -->
    <div id="search">
        <!-- input -->
        <div class="input">
            <img src="@/assets/images/baidu.png" alt="searchLogo" />
            <input
                type="text"
                placeholder="搜点什么..."
                @focus="focus(true)"
                @blur="focus(false)"
            />
            <el-icon><Search /></el-icon>
        </div>
    </div>
</template>

<script setup>
import data from "../../hooks/publicData/data";
import { Search } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";

/**
 * 搜索框聚焦
 */
function focus(bool) {
    data.searchBoxFocus = bool;
}
</script>

<style scoped lang="stylus">
#search
    width: 50%
    top: 30%

    .input
        width: 100%
        height: 50px
        display: flex
        align-items: center
        justify-content: space-between
        background: white
        border-radius: 20px
        padding: 0 20px

        img
            width: 28px

        input
            width 100%
            margin: 0 15px
            height: 100%
            background: transparent
            border: none
            outline: none
            font-size: 1rem

        .el-icon svg
            width: 25px
</style>
