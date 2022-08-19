<!--
 * @Author: N0ts
 * @Date: 2022-01-13 16:00:18
 * @LastEditTime: 2022-08-19 16:03:24
 * @Description: 导航菜单
 * @FilePath: /vue/src/components/menu/menu.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 导航菜单 -->
    <div id="menu">
        <!-- 打开菜单 -->
        <div class="openMenu" :class="{ openMenuShow: !data.openApp }">
            <el-icon
                v-if="data.saveData.openAppListShow"
                @click.stop="data.openApp = true"
                ><arrow-up
            /></el-icon>
            <Footer></Footer>
        </div>

        <!-- 菜单 -->
        <div
            class="menuBox"
            :class="{
                menuBoxShow: data.openApp && data.saveData.openAppListShow,
                menuBoxBlur: !data.saveData.AeroState
            }"
            @click.right.prevent="rightClick"
        >
            <!-- 关闭按钮 -->
            <el-icon @click="data.openApp = false"><arrow-down /></el-icon>
            <!-- 菜单列表 -->
            <div class="menuList" v-if="data.saveData.LinkList">
                <!-- 导航 -->
                <div class="navigation">
                    <div
                        v-for="(item, index) in data.saveData.LinkList"
                        :key="index"
                        @click="scroll('list-' + item.navName)"
                    >
                        {{ item.navName }}
                    </div>
                    <!-- 添加菜单 -->
                    <div class="addBtn" @click="addMenuDialog = true">
                        <Plus />
                    </div>
                </div>
                <!-- 列表 -->
                <div class="list" refname="list" :ref="setRef">
                    <div
                        v-for="(item, index) in data.saveData.LinkList"
                        :key="index"
                        :refname="'list-' + item.navName"
                        :ref="setRef"
                    >
                        <!-- 标题 -->
                        <h1>{{ item.navName }}</h1>
                        <!-- itemBox -->
                        <div class="itemBox">
                            <!-- 提示 -->
                            <el-tooltip
                                effect="dark"
                                :content="item2.content"
                                placement="bottom"
                                v-for="(item2, index2) in item.links"
                                :key="index2"
                            >
                                <!-- content -->
                                <div @click="openHref(item2.url)">
                                    <!-- logo -->
                                    <img :src="item2.img" :alt="item2.name" />
                                    <!-- text -->
                                    <div>
                                        <p class="itemTitle">
                                            {{ item2.name }}
                                        </p>
                                        <p class="itemContent">
                                            {{ item2.content }}
                                        </p>
                                    </div>
                                    <!-- 删除 -->
                                    <div class="btns" v-if="rightSetting">
                                        <div>
                                            <Edit />
                                        </div>
                                        <div>
                                            <Close />
                                        </div>
                                    </div>
                                </div>
                            </el-tooltip>
                            <div class="addBtn">
                                <Plus />
                            </div>
                        </div>
                    </div>

                    <!-- 撑开底部的盒子 -->
                    <div refname="bigBox" :ref="setRef"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 添加菜单 -->
    <el-dialog v-model="addMenuDialog" title="添加菜单" width="300px">
        <el-form
            ref="addMenuForm"
            :model="addMenuData"
            :rules="addMenuRules"
            label-width="78px"
        >
            <el-form-item label="菜单名字" prop="name">
                <el-input v-model="addMenuData.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="addMenuDialog = false"
                    >取消</el-button
                >
                <el-button type="primary" @click="addMenu(addMenuForm)"
                    >添加</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import Footer from "../footer/footer.vue";
import { ArrowUp, ArrowDown, Plus, Close, Edit } from "@element-plus/icons-vue";
import { onMounted } from "@vue/runtime-core";
import { ElIcon, ElTooltip } from "element-plus";
import data from "@/data/data";
import type { FormInstance } from "element-plus";
import { ref } from "vue";
import notify from "@/utils/notify/notify";
import local from "@/utils/localData/local";

onMounted(() => {
    // 撑开底部距离盒子高度计算
    bigBoxHeight();
});

/**
 * 元素节点
 */
let nodes: any = {};

/**
 * 获取 ref 元素
 */
function setRef(item: any) {
    // 如果元素不存在 或 id 与 refname 都不存在的话
    if (!item || !item.attributes.refname.value) {
        return;
    }

    // 添加到元素节点 优先取 id
    nodes[item.attributes.refname.value] = item;
}

/**
 * 跳转到指定链接
 */
function openHref(url: string) {
    window.open(url);
}

/**
 * 滚动到指定位置
 */
function scroll(name: string) {
    // 需要滚动的高度
    let top = 0;

    // 计算滚动高度
    for (const key in nodes) {
        if (key == name) {
            break;
        }
        if (key.includes("list-")) {
            top += nodes[key].clientHeight;
        }
    }

    // 滚动
    nodes.list.scrollTo({
        top,
        behavior: "smooth"
    });
}

/**
 * 撑开底部距离盒子高度计算
 */
function bigBoxHeight() {
    let cache;
    for (const key in nodes) {
        if (key.includes("list-")) {
            cache = nodes[key];
        }
    }

    nodes.bigBox.style.height =
        nodes.list.clientHeight - cache.clientHeight + "px";
}

/**
 * 右键状态
 */
const rightSetting = ref(false);

/**
 * 右键改变状态
 */
function rightClick() {
    rightSetting.value = !rightSetting.value;
}

/**
 * 添加菜单 dialog & form & rules & data
 */
const addMenuDialog = ref(false);
const addMenuForm = ref<FormInstance>();
const addMenuRules = ref({
    name: {
        required: true,
        message: "请填写菜单名字",
        trigger: "blur"
    }
});
const addMenuData = ref({
    name: ""
});

/**
 * 添加菜单
 */
function addMenu(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (!valid) {
            return;
        }
        data.saveData.LinkList.push({
            navName: addMenuData.value.name,
            links: []
        });
        addMenuData.value.name = "";
        addMenuDialog.value = false;
        local.save();
        notify("添加菜单成功", 1);
        console.log(
            "🚀 菜单链接数据 | file: menu.vue | line 245 | formEl.validate | data.saveData.LinkList",
            data.saveData.LinkList
        );
    });
}
</script>

<style scoped lang="less">
// 导航菜单
#menu {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;

    // 打开菜单
    .openMenu {
        width: 100%;
        height: 130px;
        background: linear-gradient(
            to top,
            black,
            rgba(0, 0, 0, 0.3) 70%,
            rgba(0, 0, 0, 0) 100%
        );
        color: white;
        font-size: 2.3rem;
        display: flex;
        justify-content: center;
        bottom: 0;
        transform: translate(-50%, 100%);

        .el-icon {
            padding-top: 15px;
            width: 100%;
            height: 40%;
            cursor: pointer;
            animation: openApp 1s ease-in-out infinite;
            -webkit-animation: openApp 1s ease-in-out infinite;

            @keyframes openApp {
                0% {
                    transform: scale(1) translateY(5px);
                    -webkit-transform: scale(1) translateY(5px);
                    -moz-transform: scale(1) translateY(5px);
                    -ms-transform: scale(1) translateY(5px);
                    -o-transform: scale(1) translateY(5px);
                    opacity: 0;
                }

                50% {
                    transform: scale(1.1);
                    -webkit-transform: scale(1.1);
                    -moz-transform: scale(1.1);
                    -ms-transform: scale(1.1);
                    -o-transform: scale(1.1);
                    opacity: 1;
                }

                100% {
                    transform: scale(1) translateY(-10px);
                    -webkit-transform: scale(1) translateY(-10px);
                    -moz-transform: scale(1) translateY(-10px);
                    -ms-transform: scale(1) translateY(-10px);
                    -o-transform: scale(1) translateY(-10px);
                    opacity: 0;
                }
            }
        }
    }

    .openMenuShow {
        transform: translate(-50%, 0%);
    }

    // 菜单
    .menuBox {
        width: 80%;
        min-width: 1000px;
        height: 60%;
        background-color: rgba(20, 20, 20, 0.5);
        backdrop-filter: blur(30px);
        bottom: 0;
        transform: translate(-50%, 100%);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;

        // 关闭按钮
        .el-icon {
            width: 100%;
            height: 50px;
            color: white;
            font-size: 2.3rem;
            cursor: pointer;

            &:hover .icon {
                transform: translateY(5px);
            }
        }

        // 菜单列表
        .menuList {
            width: 100%;
            height: calc(100% - 50px);
            display: flex;
            flex-wrap: nowrap;
            color: white;

            // 添加 icon
            .addBtn {
                display: flex;
                align-items: center;
                justify-content: center;

                svg {
                    width: 15px;
                    height: 15px;
                }
            }
        }

        // 导航
        .navigation {
            width: 20%;
            max-width: 260px;
            height: 100%;
            overflow-y: scroll;

            > div {
                width: 100%;
                padding: 10px 0;
                text-align: center;
                cursor: pointer;
                font-size: 0.9rem;
                opacity: 0.8;

                &:hover {
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                    background-color: rgba(0, 0, 0, 0.3);
                    transform: scale(1.05);
                    opacity: 1;
                }
            }
        }

        // 列表
        .list {
            width: 100%;
            height: 100%;
            overflow-y: scroll;

            > div {
                padding: 10px 30px 30px;
                box-sizing: border-box;

                > h1 {
                    font-size: 1.1rem;
                    padding: 0 0 15px 0;
                    position: relative;
                    display: inline-block;

                    &:after {
                        content: "";
                        display: block;
                        width: 50px;
                        height: 3px;
                        position: absolute;
                        bottom: 5px;
                        left: 0;
                        background: rgba(255, 255, 255, 0.3);
                    }
                }
            }

            .itemBox {
                display: flex;
                flex-wrap: wrap;

                > div {
                    display: flex;
                    width: 180px;
                    cursor: pointer;
                    padding: 10px;
                    box-sizing: border-box;
                    position: relative;

                    &:hover {
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                        background-color: rgba(0, 0, 0, 0.3);
                        transform: scale(1.05);

                        .btns {
                            opacity: 1;
                            visibility: visible;
                            transform: scale(1) translateY(-50%);
                        }
                    }

                    .btns {
                        position: absolute;
                        right: 5px;
                        top: 50%;
                        transform: scale(0) translateY(-50%);
                        display: flex;
                        color: white;
                        width: 45px;
                        opacity: 0;
                        visibility: hidden;

                        > div {
                            width: 15px;
                            height: 15px;
                            background-color: rgb(225, 225, 225);
                            border-radius: 50%;
                            margin-left: 3px;
                            padding: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            > svg {
                                width: 13px;
                                height: 13px;
                                color: rgb(75, 75, 75);
                            }

                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }

                    img {
                        width: 40px;
                        height: 40px;
                        object-fit: cover;
                        border-radius: 50%;
                        margin-right: 5px;
                    }

                    > div {
                        width: calc(100% - 40px);

                        .itemTitle {
                            width: 100%;
                            font-size: 0.8rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }

                        .itemContent {
                            color: #aeaeae;
                            font-size: 0.6rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }

    .menuBoxBlur {
        backdrop-filter: none;
        background-color: rgba(20, 20, 20, 0.8);
    }

    .menuBoxShow {
        transform: translate(-50%, 0%);
    }
}
</style>
