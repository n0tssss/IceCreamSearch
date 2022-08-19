/*
 * @Author: N0ts
 * @Date: 2022-08-18 09:26:13
 * @Description: 初始化缓存配置
 * @FilePath: /vue/src/utils/localData/init.ts
 * @Mail：mail@n0ts.cn
 */

import data from "@/data/data";
import stor from "@/utils/storage/storage";
import logs from "@/data/log";
import local from "./local";

/**
 * 初始化
 */
const go = function () {
    // 获取配置
    const storageCache = stor.storage.get("IceCream");
    const sessionCache = stor.session.get("IceCream");

    // 备份初始数据
    data.saveDataCache = {
        ...data.saveData
    };

    // 缓存配置读取，优先 storage
    const cache = storageCache == null ? storageCache : sessionCache;
    // 关闭初始化
    data.initDialog = false;
    // 用户是否允许操作 storage
    data.saveData.updateStorage = storageCache != null;

    // 缓存是否存在新字段需要更新
    checkVersion(cache);

    // 存在配置则覆盖
    if (cache) {
        data.saveData = cache;
    }

    // 日志是否存在更新
    checkLogUpdate();

    local.save();
};

/**
 * 版本是否更新
 */
function checkVersion(cache: any) {
    if (!cache) {
        return cache;
    }
    // 判断数据是否缺少
    if (Object.keys(cache).length === Object.keys(data.saveDataCache).length) {
        return cache;
    }
    // 数据修复
    cache = { ...data.saveDataCache, ...cache };
    local.save();
}

/**
 * 日志是否更新
 */
function checkLogUpdate() {
    // 如果时间不存在 或 与最新日志时间不一致
    if (
        !data.saveData.updateTime ||
        data.saveData.updateTime !== logs[0].time
    ) {
        // 提示
        data.updateDialog = true;
        // 保存最新时间
        data.saveData.updateTime = logs[0].time;
        local.save();
    }
}

export default {
    go
};
