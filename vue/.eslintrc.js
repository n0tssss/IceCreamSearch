/*
 * @Author: N0ts
 * @Date: 2022-01-10 15:27:28
 * @LastEditTime: 2022-01-10 15:41:08
 * @Description: Eslint
 * @FilePath: /vue/.eslintrc.js
 * @Mail：mail@n0ts.cn
 */

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};
