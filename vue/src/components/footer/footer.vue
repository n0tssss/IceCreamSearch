<!--
 * @Author: N0ts
 * @Date: 2022-08-16 15:06:38
 * @Description: 页脚
 * @FilePath: /vue/src/components/footer/footer.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 页脚 -->
    <div id="footer" v-if="data.saveData.footerText">
        <div v-if="data.saveData.bgLinkHref && data.saveData.bgLinkContent">
            <p>
                <a :href="data.saveData.bgLinkHref" target="_blank">{{
                    data.saveData.bgLinkContent
                }}</a>
            </p>
        </div>
        <div>
            <div>
                <span>© {{ time }} </span>
                <a href="#"> IceCreemSearch </a>
                <span> | THEME MADE BY </span>
                <a href="https://n0ts.cn" target="_blank">N0ts</a>
            </div>
            <div>
                <a href="http://beian.miit.gov.cn" target="_blank"
                    >湘ICP备20005603号-2</a
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import data from "@/data/data";

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
        div {
            display: inline-block;
            margin: 5px 10px;
            line-height: 0.5rem;
        }

        span {
            opacity: 0.5;
        }

        a {
            color: white;
            text-decoration: none;
            opacity: 0.5;

            &:hover {
                color: var(--themeColor);
                opacity: 1;
            }
        }
    }
}
</style>
