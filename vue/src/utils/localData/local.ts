/*
 * @Author: N0ts
 * @Date: 2022-01-13 11:01:41
 * @LastEditTime: 2022-08-16 16:40:11
 * @Description: 本地缓存操作
 * @FilePath: /vue/src/utils/localData/local.ts
 * @Mail：mail@n0ts.cn
 */

import data from "@/data/data";
import stor from "@/utils/storage/storage";
import notify from "@/utils/notify/notify";

export default {
    /**
     * 保存数据到缓存
     */
    save() {
        stor.session.remove("IceCream");
        stor.storage.remove("IceCream");

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
    initSave(b: boolean) {
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
