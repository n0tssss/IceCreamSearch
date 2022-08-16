/*
 * @Author: N0ts
 * @Date: 2022-01-12 11:31:22
 * @LastEditTime: 2022-08-16 15:33:06
 * @Description: 提示框
 * @FilePath: /vue3/src/utils/notify/notify.ts
 * @Mail：mail@n0ts.cn
 */

import { ElNotification } from "element-plus";

/**
 * 通知弹窗
 * @param {*} message 通知消息
 * @param {*} select 通知类型：成功、警告、提示、错误
 */
export default function (message: any, select: any) {
    let title: string;
    let type: any;
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
        // duration: 0,
        title,
        message,
        type
    });
}
