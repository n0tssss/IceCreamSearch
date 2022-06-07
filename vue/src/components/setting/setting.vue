<!--
 * @Author: N0ts
 * @Date: 2022-02-23 22:30:36
 * @Description: 设置界面
 * @FilePath: /vue/src/components/setting/setting.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 设置界面 -->
    <div id="setting">
        <!-- 打开按钮 -->
        <div class="openBtn" @click="data.leftBar = !data.leftBar">
            <el-icon><tools /></el-icon>
        </div>

        <el-drawer v-model="data.leftBar" direction="ltr" custom-class="menu">
            <el-tabs v-model="data.tabsActive">
                <el-tab-pane label="基本" name="basic"><basic /></el-tab-pane>
                <el-tab-pane label="样式" name="style">Config</el-tab-pane>
                <el-tab-pane label="搜索" name="search">Role</el-tab-pane>
                <el-tab-pane label="个人" name="me">Task</el-tab-pane>
                <el-tab-pane label="其他" name="orther">Task</el-tab-pane>
                <el-tab-pane label="关于" name="about">Task</el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
</template>

<script setup>
import { Tools } from "@element-plus/icons-vue";
import { ElIcon, ElDrawer, ElTabs, ElTabPane } from "element-plus";
import data from "../../data/data";
import basic from "./basic.vue";
</script>

<style scoped lang="less">
#setting {
    position: absolute;
    z-index: 2;

    :deep(.el-drawer) {
        width: 320px;
        background-color: rgb(245, 245, 245);
    }

    .openBtn {
        width: 50px;
        height: 50px;
        background: black;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.4;
        backdrop-filter: blur(10px);
        cursor: pointer;
        position: fixed;
        bottom: 50px;
        left: 30px;

        :deep(.el-icon),
        svg {
            width: 25px;
            height: 25px;
            color: white;
        }

        &:hover {
            transform: scale(1.1) rotate(360deg);
            opacity: 0.8;
        }
    }

    :deep(.el-overlay) .menu {
        #el-drawer__title {
            margin: 0;
            padding: 0;
            position: absolute;
            right: 20px;
            top: 20px;
            z-index: 1;
        }

        .el-drawer__body {
            padding-top: 13px;

            .el-tabs__header {
                margin-right: 40px;
            }

            .el-tabs__content {
                padding: 10px;
                overflow: unset;
                font-size: 0.9rem;
            }

            .el-tabs__item {
                padding: 0 10px;
            }
        }
    }
}
</style>
