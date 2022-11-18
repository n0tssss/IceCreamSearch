<!--
 * @Author: N0ts
 * @Date: 2022-11-18 11:35:55
 * @Description: 用户模块
 * @FilePath: /vue/src/components/setting/me.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <div id="style">
        <div class="optionsBox">
            <p class="title">登陆 Gitee-码云</p>
            <p class="about">登陆来同步您的数据配置</p>
            <div class="operation"></div>
            <div class="btns">
                <el-button type="primary" @click="openAuthorization"
                    >前往授权</el-button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import config from "@/config/config";

/**
 * 打开授权页面
 */
function openAuthorization() {
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${config.gitee.clientId}&redirect_uri=${config.gitee.redirectUri}&response_type=code&scope=${config.gitee.scope}`;
}
</script>

<style scoped lang="less"></style>
