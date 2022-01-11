/*
 * @Author: N0ts
 * @Date: 2022-01-11 09:48:26
 * @LastEditTime: 2022-01-11 09:54:18
 * @Description: Axios 封装
 * @FilePath: /vue/src/utils/http/axios.js
 * @Mail：mail@n0ts.cn
 */

import axios from "axios";

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axios;
