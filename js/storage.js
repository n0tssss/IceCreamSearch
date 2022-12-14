/*
 * @Author: N0ts
 * @Date: 2020-12-21 09:34:11
 * @LastEditTime: 2022-01-13 11:09:47
 * @Description: 本地存储封装
 * @FilePath: /IceCreamSearch/js/storage.js
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
