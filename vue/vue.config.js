/*
 * @Author: N0ts
 * @Date: 2022-08-16 14:56:04
 * @Description: vue config
 * @FilePath: /vue/vue.config.js
 * @Mail：mail@n0ts.cn
 */

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: "../beta",
    pages: {
        index: {
            // page 的入口
            entry: "src/main.ts",
            // title
            title: "IceCream 冰激凌 | 简约至上"
        }
    }
});
