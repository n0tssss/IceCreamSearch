/*
 * @Author: N0ts
 * @Date: 2020-12-21 09:34:11
 * @LastEditTime: 2021-09-25 18:12:30
 * @Description: 本地存储封装
 * @FilePath: \IceCreamSearch\js\storage.js
 * @Mail：mail@n0ts.cn
 */

let $stor = window.localStorage;
let $sess = window.sessionStorage;

export default {
    getAPI: 'https://cors.lovewml.cn/cors/',
    ServerBase: 'https://navigation.lovewml.cn/api/getList',
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
}