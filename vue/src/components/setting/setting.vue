<!--
 * @Author: N0ts
 * @Date: 2022-01-14 11:06:53
 * @LastEditTime: 2022-02-23 23:23:52
 * @Description: 设置界面
 * @FilePath: /vue/src/components/setting/setting.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 设置界面 -->
    <div id="setting">
        <!-- 打开按钮 -->
        <div class="openBtn">
            <el-icon><tools /></el-icon>
        </div>
    </div>
</template>

<script setup>
import { Tools } from "@element-plus/icons-vue";
import {} from "@element-plus/icons-vue";
</script>

<style scoped lang="stylus">
#setting
    position: absolute
    z-index: 2

    .openBtn
        width: 50px
        height: 50px
        background: black
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        opacity: .4
        backdrop-filter: blur(5px)
        cursor: pointer
        position: fixed
        bottom: 50px
        left: 30px

        el-icon,
        svg
            width: 25px
            height: 25px
            color: white

        &:hover
            transform: scale(1.1) rotate(360deg)
            opacity: .8
</style>
