/*
 * @Author: N0ts
 * @Date: 2022-01-13 11:01:41
 * @LastEditTime: 2022-01-13 13:14:27
 * @Description: 本地缓存操作
 * @FilePath: /vue/src/hooks/localStorage/local.js
 * @Mail：mail@n0ts.cn
 */

import data from "../../hooks/publicData/data";
import stor from "../storage/storage";
import notify from "../notify/notify";

export default {
    /**
     * 保存数据到缓存
     */
    save() {
        // 是否允许存入 Storage
        if (data.saveData.updateStorage) {
            stor.storage.set("IceCream", data.saveData);
        }

        // 初始化后存入 Session
        if (!data.initDialog) {
            stor.session.set("IceCream", data.saveData);
        }
    },

    /**
     * 本地缓存开关
     * @param {*} b 开 & 关
     */
    initSave(b) {
        data.saveData.updateStorage = b;
        const text = b
            ? ["已开启本地存储设置", 1]
            : ["已关闭本地存储设置，设置里面还可以开启哦", 3];
        notify(text[0], text[1]);

        // 关闭窗口
        data.initDialog = false;
        this.save();
    }
};
