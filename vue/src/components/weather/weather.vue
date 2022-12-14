<!--
 * @Author: N0ts
 * @Date: 2022-08-16 15:06:38
 * @Description: 天气组件
 * @FilePath: /vue3/src/components/weather/weather.vue
 * @Mail：mail@n0ts.cn
-->

<template>
    <!-- 天气组件 -->
    <div id="weather">
        <div v-if="data.weatherInfo">
            <!-- 地址 -->
            <p>{{ data.weatherInfo.address }}</p>
            <!-- 温度 -->
            <p>{{ data.weatherInfo.temperature }}</p>
            <!-- 天气图片 -->
            <img
                :src="data.weatherInfo.weatherImg"
                :alt="data.weatherInfo.weatherImg"
            />
            <!-- 空气质量 -->
            <p>{{ data.weatherInfo.air }}</p>
        </div>

        <!-- 悬浮卡片 -->
        <iframe
            v-if="data.frameUrl"
            :src="data.frameUrl"
            frameborder="0"
            height="450px"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import axios from "../../utils/http/axios";

const data: any = reactive({});

goWeather();
/**
 * 获取天气信息
 */
async function goWeather() {
    try {
        // 获取经纬度
        const position: any = await getPosition();
        data.frameUrl = `https://widget-page.qweather.net/h5/index.html?md=013&bg=1&lc=${position.longitude},${position.latitude}&key=7fb5816208334d858a799b3f531c5d14&v=_1641877899474`;
        // console.log(position);

        // 根据经纬度获取具体位置信息
        const address: any = await getAddress(position);
        // console.log(address);

        // 获取天气
        const weather: any = await getWeather(
            address.HeWeather6[0].basic[0].cid
        );
        // console.log(weather);
        data.weatherInfo = {
            address: address.HeWeather6[0].basic[0].location, // 地址
            temperature: weather.now.tmp + "°", // 温度
            weatherImg: `https://cdn.heweather.com/img/plugin/190516/icon/c/${weather.now.cond_code}d.png`, // 天气图片
            air: weather.air_now_city.qlty // 空气质量
        };
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取经纬度
 */
function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            // 获取经纬度
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    resolve({
                        // 纬度
                        latitude: position.coords.latitude,
                        // 经度
                        longitude: position.coords.longitude
                    });
                },
                function () {
                    reject(arguments);
                }
            );
        } else {
            reject("你的浏览器不支持当前地理位置信息获取");
        }
    });
}

/**
 * 根据经纬度获取具体位置信息
 */
function getAddress(position: any) {
    return new Promise((resolve, reject) => {
        axios
            .get("https://geoapi.qweather.com/find", {
                params: {
                    key: "7fb5816208334d858a799b3f531c5d14",
                    group: "cn",
                    lang: "zh",
                    location: `${position.longitude},${position.latitude}`
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * 根据位置信息获取天气
 */
function getWeather(location: any) {
    return new Promise((resolve, reject) => {
        axios
            .get("https://widget-api.heweather.net/s6/plugin/h5", {
                params: {
                    key: "7fb5816208334d858a799b3f531c5d14",
                    location,
                    lang: "zh"
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
</script>

<style scoped lang="less">
#weather {
    display: inline-block;
    padding: 10px 30px;
    position: fixed;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 2;

    img {
        width: 1.5rem;
        height: 1.5rem;
    }

    * {
        padding: 0 3px;
        float: left;
    }

    iframe {
        position: absolute;
        left: 25px;
        top: 200%;
        opacity: 0;
        visibility: hidden;
        padding: 0;
    }

    &:hover iframe {
        opacity: 1;
        visibility: visible;
        top: 100%;
    }
}
</style>
