<!--
 * @Author: N0ts
 * @Date: 2022-01-14 10:42:59
 * @LastEditTime: 2022-01-14 11:05:33
 * @Description: 页脚
 * @FilePath: /vue/src/components/footer/footer.vue
 * @Mail：mail@n0ts.cn
-->

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
                © {{ data.time }} IceCreemSearch | THEME MADE BY
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
import data from "../../hooks/publicData/data";
</script>

<style scoped lang="stylus">
#footer
    width: 100%
    font-size: .8rem
    position: absolute
    bottom: 0
    left: 0
    text-align: center
    padding-bottom: 15px

    div
        opacity: .5

        p
            display: inline-block
            margin: 5px 10px
            line-height: .5rem

        a
            color: white
            text-decoration: none

            &:hover
                color: var(--themeColor)

        &:hover
            opacity: 1
</style>
