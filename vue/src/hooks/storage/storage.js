/*
 * @Author: N0ts
 * @Date: 2022-01-13 11:10:14
 * @LastEditTime: 2022-01-13 11:10:14
 * @Description: Storage 缓存操作
 * @FilePath: /vue/src/hooks/storage/storage.js
 * @Mail：mail@n0ts.cn
 */

const $stor = window.localStorage;
const $sess = window.sessionStorage;

export default {
    storage: {
        set(value, params) {
            $stor.setItem(value, JSON.stringify(params));
        },
        get(value) {
            return JSON.parse($stor.getItem(value));
        },
        remove(value) {
            $stor.removeItem(value);
        },
        clear() {
            $stor.clear();
        }
    },
    session: {
        set(value, params) {
            $sess.setItem(value, JSON.stringify(params));
        },
        get(value) {
            return JSON.parse($sess.getItem(value));
        },
        remove(value) {
            $sess.removeItem(value);
        },
        clear() {
            $sess.clear();
        }
    }
};
