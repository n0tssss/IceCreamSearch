<!--
 * @Author: N0ts
 * @Date: 2022-02-23 22:30:36
 * @Description: 设置界面
 * @FilePath: /vue/src/components/setting/setting.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 设置界面 -->
    <div
        id="setting"
        :class="{
            settingBlur: !data.saveData.AeroState
        }"
    >
        <!-- 打开按钮 -->
        <div
            class="openBtn"
            @click="data.leftBar = !data.leftBar"
            :class="{
                optionIcon: true,
                optionIconLeftTop: data.saveData.settingLocation == 1,
                optionIconRightTop: data.saveData.settingLocation == 2,
                optionIconRightBottom: data.saveData.settingLocation == 3,
                optionIconLeftBottom: data.saveData.settingLocation == 4
            }"
        >
            <el-icon><tools /></el-icon>
        </div>

        <el-drawer v-model="data.leftBar" direction="ltr" custom-class="menu">
            <el-tabs v-model="data.tabsActive">
                <el-tab-pane label="基本" name="basic"><basic /></el-tab-pane>
                <el-tab-pane label="样式" name="style">
                    <styleComm />
                </el-tab-pane>
                <el-tab-pane label="搜索" name="search">Role</el-tab-pane>
                <el-tab-pane label="个人" name="me">Task</el-tab-pane>
                <el-tab-pane label="其他" name="orther">Task</el-tab-pane>
                <el-tab-pane label="关于" name="about">Task</el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { Tools } from "@element-plus/icons-vue";
// import { ElIcon, ElDrawer, ElTabs, ElTabPane } from "element-plus";
import data from "@/data/data";
import basic from "./basic.vue";
import styleComm from "./style.vue";
</script>

<style scoped lang="less">
#setting {
    position: absolute;
    z-index: 2;

    :deep(.el-drawer) {
        min-width: 320px;
        background-color: rgb(245, 245, 245);
    }

    .openBtn {
        width: 50px;
        height: 50px;
        background: black;
        // border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.4;
        backdrop-filter: blur(10px);
        cursor: pointer;
        position: fixed;

        :deep(.el-icon),
        svg {
            width: 25px;
            height: 25px;
            color: white;
        }

        &:hover {
            opacity: 0.8;
        }

        &:hover :deep(.el-icon),
        svg {
            transform: scale(1.1) rotate(360deg);
            opacity: 0.8;
        }
    }

    @iconWidth: 40px;
    @iconHeight: 80px;

    /* 设置界面图标 - 各位置 */
    .optionIconLeftTop {
        top: @iconHeight;
        left: @iconWidth;
    }

    .optionIconRightTop {
        top: @iconHeight;
        right: @iconWidth;
    }

    .optionIconRightBottom {
        bottom: @iconHeight;
        right: @iconWidth;
    }

    .optionIconLeftBottom {
        bottom: @iconHeight;
        left: @iconWidth;
    }

    :deep(.el-overlay) .menu {
        .el-drawer__header {
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

        // 设置选项卡样式
        .optionsBox {
            padding: 15px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            margin-bottom: 15px;
            background-color: white;

            .title {
                margin-bottom: 5px;
                color: rgb(30, 30, 30);
            }

            .about {
                color: rgb(142, 142, 142);
                font-size: 0.8rem;
            }

            &:hover {
                transform: translateY(-5px);
                box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
                    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
            }

            .operation {
                margin-top: 3px;
            }

            .btns {
                margin-top: 5px;
            }
        }
    }
}

.settingBlur {
    :deep(.el-overlay) {
        backdrop-filter: none;
    }
}
</style>
