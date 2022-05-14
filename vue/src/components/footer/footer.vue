<template>
    <!-- 页脚 -->
    <div id="footer">
        <div v-if="data.saveData.bgLinkHref && data.saveData.bgLinkContent">
            <p>
                <a :href="data.saveData.bgLinkHref" target="_blank">{{
                    data.saveData.bgLinkContent
                }}</a>
            </p>
        </div>
        <div>
            <p>
                © {{ time }} IceCreemSearch | THEME MADE BY
                <a href="https://n0ts.cn" target="_blank">N0ts</a>
            </p>
            <p>
                <a href="http://beian.miit.gov.cn" target="_blank"
                    >湘ICP备20005603号-2</a
                >
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import data from "../../data/data";

// 页脚年份
const time = ref(new Date().getFullYear());
</script>

<style scoped lang="less">
#footer {
    width: 100%;
    font-size: 0.8rem;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    padding-bottom: 15px;

    div {
        opacity: 0.5;

        p {
            display: inline-block;
            margin: 5px 10px;
            line-height: 0.5rem;
        }

        a {
            color: white;
            text-decoration: none;

            &:hover {
                color: var(--themeColor);
            }
        }

        &:hover {
            opacity: 1;
        }
    }
}
</style>
