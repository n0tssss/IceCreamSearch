<!--
 * @Author: N0ts
 * @Date: 2022-01-11 10:23:17
 * @LastEditTime: 2022-06-07 23:54:47
 * @Description: 搜索框组件
 * @FilePath: /vue/src/components/search/search.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 搜索框组件 -->
    <div id="search" :class="{ searchGoTop: data.openApp }">
        <!-- input 输入框 -->
        <div class="input" :class="{ searchActive: data.searchBoxFocus }">
            <!-- 搜索引擎 logo -->
            <img
                @click="soSelect = !soSelect"
                :src="data.saveData.so[data.saveData.soIndex].icon"
                alt="searchLogo"
            />
            <!-- 搜索框 -->
            <input
                type="text"
                placeholder="搜点什么..."
                v-model="data.soBoxtext"
                @focus="data.searchBoxFocus = true"
                @blur="data.searchBoxFocus = false"
                @keyup="searchGo"
            />
            <!-- 搜索图标 -->
            <el-icon @click="enter"><Search /></el-icon>
        </div>

        <!-- 搜索结果 -->
        <div
            class="searchResult"
            refname="searchResult"
            :ref="setRef"
            :style="'height:' + data.soBoxHeight + 'px;'"
            :class="{
                searchResultAction: data.soBoxHeight != 0,
                searchResultClose: !data.searchBoxFocus
            }"
        >
            <div
                @mousedown="goHref(item.text)"
                @mouseover="data.searchSelectIndex = index"
                @mouseout="data.searchSelectIndex = -1"
                :class="{ searchResultActive: data.searchSelectIndex == index }"
                v-for="(item, index) in data.soBoxlist"
                :key="index"
            >
                {{ item.text }}
            </div>
        </div>

        <!-- 搜索引擎切换 -->
        <div
            class="searchChange"
            :class="{ searchChangeActive: soSelect }"
            v-if="data.saveData.so"
        >
            <!-- 搜索引擎列表 -->
            <div
                v-for="(item, index) in data.saveData.so"
                :key="index"
                :class="{
                    searchChangeDivActive: index == data.saveData.soIndex
                }"
                @click="data.saveData.soIndex = index"
            >
                <!-- logo -->
                <img :src="item.icon" :alt="item.icon" />
                <!-- 内容 -->
                <p>{{ item.name }}</p>
            </div>
            <!-- 添加与关闭按钮 -->
            <div @click="data.soSelectAdd = true">
                <el-icon><circle-plus /></el-icon>
            </div>
            <div @click="soSelect = false">
                <el-icon><circle-close /></el-icon>
            </div>
        </div>

        <!-- 搜索引擎添加 -->
        <el-dialog
            title="新增一个搜索引擎"
            v-model="data.soSelectAdd"
            :append-to-body="true"
        >
            <div>
                <p>搜索引擎名称</p>
                <p>例如：百度</p>
                <el-input
                    v-model="data.soAdd.name"
                    placeholder="搜索引擎名称"
                ></el-input>
            </div>
            <div>
                <p>搜索引擎图标</p>
                <p>例如：https://www.baidu.com/favicon.ico</p>
                <el-input
                    v-model="data.soAdd.icon"
                    placeholder="搜索引擎图标"
                ></el-input>
            </div>
            <div>
                <p>搜索引擎链接</p>
                <p>例如：https://www.baidu.com/s?wd=</p>
                <el-input
                    v-model="data.soAdd.linkHead"
                    placeholder="搜索引擎链接"
                ></el-input>
            </div>
            <el-button type="primary" @click="add" style="width: 100%"
                >添加</el-button
            >
        </el-dialog>

        <!-- 一言 -->
        <div class="hitokoto" id="hitokoto">{{ hitokoto }}</div>
    </div>
</template>

<script setup>
import { Search, CirclePlus, CircleClose } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { ElIcon, ElDialog, ElInput, ElButton } from "element-plus";
import data from "../../data/data";
import axios from "../../utils/http/axios";
import notify from "../../utils/notify/notify";
import local from "../../utils/localData/local";

// 选择引擎界面是否打开
const soSelect = ref(false);

/**
 * 元素节点
 */
let nodes = {};

/**
 * 获取 ref 元素
 */
function setRef(item) {
    // 如果元素不存在 或 id 与 refname 都不存在的话
    if (!item || !item.attributes.refname.value) {
        return;
    }

    // 添加到元素节点 优先取 id
    nodes[item.attributes.refname.value] = item;
}

/**
 * setup
 */
gethitokoto(); // 获取一言
keyDown();

/**
 * 加载完毕
 */
onMounted(() => {
    /**
     * 一言复制
     */
    // eslint-disable-next-line no-undef
    new ClipboardJS("#hitokoto", {
        text: () => {
            notify("一言已复制", 1);
            return hitokoto.value;
        }
    });
});

/**
 * 获取一言
 */
const hitokoto = ref(":D 获取中...");
function gethitokoto() {
    // 一言是否展示
    if (!data.saveData.hitokotoShow) {
        return;
    }

    // 一言类型选择
    let type = "?";
    data.saveData.hitokotoIndex.forEach((item) => {
        type += item == "all" ? "" : `c=${item}&`;
    });

    // 类型判断
    axios
        .get("https://v1.hitokoto.cn" + type)
        .then((res) => {
            // hitokoto.value = `「 ${res.hitokoto} 」- ${res.from}`;
            hitokoto.value = `${res.hitokoto}`;
        })
        .catch((err) => {
            console.log(err);
        });
}
/**
 * 搜索框输入文字
 */
// 输入框临时内容
const soBoxtextCache = ref("");
function searchGo(e) {
    // 获取键位
    let key =
        e || event || window.event || arguments.callee.caller.arguments[0];

    // 无视上下按键
    if ((key && key.keyCode == 38) || (key && key.keyCode == 40)) {
        return (soBoxtextCache.value = data.soBoxtext);
    }

    // 回车跳转搜索
    if (e.keyCode == 13) {
        return enter();
    }

    // 搜索结果选中索引修改
    data.searchSelectIndex = -1;

    // 是否有内容
    if (!data.soBoxtext) {
        data.soBoxHeight = 0;
        return (data.soBoxlist = []);
    }

    // 请求百度获取搜索匹配结果
    axios
        .get("https://api.n0ts.cn/baidu", {
            params: {
                keywords: data.soBoxtext
            }
        })
        .then((res) => {
            // 是否有内容
            if (!data.soBoxtext) {
                data.soBoxHeight = 0;
                return (data.soBoxlist = []);
            }

            // 提取搜索结果转为数组
            data.soBoxlist = res.data.result;

            // 结果框高度计算
            data.soBoxHeight =
                (data.soBoxlist.length > data.saveData.soBoxlistShowNum
                    ? data.saveData.soBoxlistShowNum
                    : data.soBoxlist.length) * 40;

            console.log("搜索结果", data.soBoxlist);
        })
        .catch(() => {
            data.soBoxHeight = 0;
            return (data.soBoxlist = []);
        });
}

/**
 * 回车跳转搜索
 */
function enter() {
    if (!data.soBoxtext) {
        return notify("您还没有输入搜索内容呢", 3);
    }
    goHref(data.soBoxtext);
}

/**
 * 跳转搜索
 */
function goHref(item) {
    window.open(
        data.saveData.so[data.saveData.soIndex].linkHead +
            encodeURIComponent(item)
    );
}

/**
 * 当搜索框聚焦时关闭搜索引擎选择框
 */
watch(
    () => data.searchBoxFocus,
    () => {
        if (data.searchBoxFocus) {
            // 关闭导航菜单
            // data.openApp = false;
            // 关闭搜索引擎选择框
            soSelect.value = false;
        }
    }
);

/**
 * 添加搜索引擎
 */
function add() {
    // 数据验证
    if (!data.soAdd.name || !data.soAdd.icon || !data.soAdd.linkHead) {
        return notify("请填写全部内容", 2);
    }

    // 添加
    data.saveData.so.push(data.soAdd);
    // 清空数据
    data.soAdd = {
        name: "",
        icon: "",
        linkHead: ""
    };
    // 保存数据
    notify("添加成功", 1);
    local.save();
    // 关闭对话框
    data.soSelectAdd = false;
}

/**
 * 上下键切换选项
 */
function keyDown() {
    // 键位
    let key;

    document.onkeydown = (e) => {
        // 是否搜索
        if (!data.searchBoxFocus) {
            return;
        }

        // 键位获取
        key =
            e || event || window.event || arguments.callee.caller.arguments[0];

        // 上下键检测
        if (key && key.keyCode == 38) {
            // 按下上箭头
            // 索引超出判断
            if (data.searchSelectIndex == 0) {
                data.searchSelectIndex = data.soBoxlist.length - 1;
            } else {
                data.searchSelectIndex--;
            }
            // 结果修改
            data.soBoxtext = data.soBoxlist[data.searchSelectIndex];
        } else if (key && key.keyCode == 40) {
            // 按下下箭头
            // 索引超出判断
            if (data.searchSelectIndex == data.soBoxlist.length - 1) {
                data.searchSelectIndex = 0;
            } else {
                data.searchSelectIndex++;
            }
            // 结果修改
            data.soBoxtext = data.soBoxlist[data.searchSelectIndex];
        }
    };
}
</script>

<style scoped lang="less">
// 搜索框组件
#search {
    width: 50%;
    height: 50px;
    top: 30%;
    backdrop-filter: blur(10px);
    border-radius: 50px;
    z-index: 1;

    // input 输入框
    .input {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 50px;
        padding: 0 20px;
        opacity: 0.3;
        user-select: text !important;
        -webkit-user-select: text !important;
        background: white;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        box-sizing: border-box;

        &:hover {
            opacity: 0.5;
        }

        img {
            width: 25px;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }
        }

        input {
            width: 100%;
            margin: 0 15px;
            height: 100%;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1rem;
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        .el-icon {
            transform: scale(1.3);
            cursor: pointer;

            &:hover {
                transform: scale(1.5);
            }
        }
    }

    .searchActive {
        opacity: 1 !important;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    // 搜索结果
    .searchResult {
        width: 100%;
        background: white;
        overflow: hidden;
        opacity: 0;

        div {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            color: #424242;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }

        .searchResultActive {
            background-color: rgb(230, 230, 230);
            padding: 0 25px;
            color: black;
        }
    }

    .searchResultAction {
        margin-top: 10px;
        opacity: 1;
    }

    .searchResultClose {
        height: 0 !important;
    }

    // 搜索引擎切换
    .searchChange {
        width: 100%;
        height: 0;
        background: white;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.1s;

        > div {
            display: flex;
            height: 55px;
            justify-content: center;
            align-content: center;
            flex-wrap: wrap;
            opacity: 0.5;
            transform: scale(0.9);
            cursor: pointer;

            img {
                width: 30px;
                height: 30px;
            }

            p {
                width: 100%;
                text-align: center;
                font-size: 0.8rem;
            }

            &:hover {
                opacity: 1;
            }

            .el-icon {
                font-size: 2rem;
                padding: 0 8px;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .searchChangeDivActive {
            color: var(--themeColor);
            transform: scale(1);
            opacity: 1;
        }
    }

    .searchChangeActive {
        height: auto;
        opacity: 1;
        margin-top: 10px;
        padding: 10px 20px;
        visibility: visible;
    }

    // 一言
    .hitokoto {
        width: 100%;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
    }
}

.searchGoTop {
    transform: translate(-50%, -100px) !important;
}

.el-dialog .el-dialog__body > div {
    margin-bottom: 10px;
}
</style>
