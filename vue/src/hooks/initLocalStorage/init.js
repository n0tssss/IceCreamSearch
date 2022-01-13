/*
 * @Author: N0ts
 * @Date: 2022-01-13 11:07:57
 * @LastEditTime: 2022-01-13 13:18:21
 * @Description: 初始化缓存配置
 * @FilePath: /vue/src/hooks/initLocalStorage/init.js
 * @Mail：mail@n0ts.cn
 */

import data from "../../hooks/publicData/data";
import stor from "../storage/storage";
import logs from "../publicData/log";
import local from "../localStorage/local";

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

    // 从缓存中读取配置
    let cache = null;
    if (storageCache) {
        cache = storageCache;
        // 关闭初始化
        data.initDialog = false;
        // 用户允许了操作 Storage
        data.saveData.updateStorage = true;
    } else if (sessionCache) {
        cache = sessionCache;
        // 关闭初始化
        data.initDialog = false;
        // 用户不允许操作 Storage
        data.saveData.updateStorage = false;
    }

    // 缓存是否存在新字段需要更新
    checkVersion(cache);

    // 日志是否存在更新
    checkLogUpdate();

    local.save();
};

/**
 * 版本是否更新
 */
function checkVersion(cache) {
    if (!cache) {
        return cache;
    }
    // 判断数据是否缺少
    if (Object.keys(cache).length == Object.keys(data.saveDataCache).length) {
        return cache;
    }
    // 遍历数据修复
    for (let key in data.saveDataCache) {
        if (!cache[key]) {
            cache[key] = data.saveDataCache[key];
        }
    }
    local.save();
}

/**
 * 日志是否更新
 */
function checkLogUpdate() {
    // 如果时间不存在 或 与最新日志时间不一致
    if (!data.saveData.updateTime || data.saveData.updateTime != logs[0].time) {
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
