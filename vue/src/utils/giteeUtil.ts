/*
 * @Author: N0ts
 * @Date: 2022-11-18 11:58:33
 * @Description: 码云工具
 * @FilePath: /vue/src/utils/giteeUtil.ts
 * @Mail：mail@n0ts.cn
 */
import http from "@/utils/http/axios";
import config from "@/config/config";

export default {
    /**
     * 获取码云用户 Token
     * @param code 回调 code
     */
    getGiteeToken(code: string) {
        http.post("https://gitee.com/oauth/token", {
            grant_type: "authorization_code",
            code,
            client_id: config.gitee.clientId,
            redirect_uri: config.gitee.redirectUri,
            client_secret: config.gitee.clientSecret
        }).then((res) => {
            console.log(res);
        });
    }
};
