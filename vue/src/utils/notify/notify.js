/*
 * @Author: N0ts
 * @Date: 2022-01-12 11:31:22
 * @LastEditTime: 2022-01-12 13:58:49
 * @Description: 提示框
 * @FilePath: /vue/src/utils/notify/notify.js
 * @Mail：mail@n0ts.cn
 */

import { ElNotification } from "element-plus";

/**
 * 通知弹窗
 * @param {*} message 通知消息
 * @param {*} select 通知类型：成功、警告、提示、错误
 */
export default function (message, select) {
    let title;
    let type;
    switch (select) {
        case 1:
            title = "成功";
            type = "success";
            break;
        case 2:
            title = "警告";
            type = "warning";
            break;
        case 3:
            title = "提示";
            type = "info";
            break;
        default:
            title = "错误";
            type = "error";
            break;
    }
    ElNotification({
        title,
        message,
        type
    });
}
