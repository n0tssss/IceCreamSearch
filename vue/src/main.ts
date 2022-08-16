/*
 * @Author: N0ts
 * @Date: 2022-08-16 14:56:04
 * @Description: main
 * @FilePath: /vue3/src/main.ts
 * @Mail：mail@n0ts.cn
 */

import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
