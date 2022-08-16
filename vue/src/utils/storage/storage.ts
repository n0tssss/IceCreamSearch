/*
 * @Author: N0ts
 * @Date: 2022-08-16 15:07:37
 * @Description: Storage 缓存操作
 * @FilePath: /vue3/src/utils/storage/storage.ts
 * @Mail：mail@n0ts.cn
 */

const $stor = window.localStorage;
const $sess = window.sessionStorage;

export default {
    storage: {
        set(value: string, params: any) {
            $stor.setItem(value, JSON.stringify(params));
        },
        get(value: string) {
            const result = $stor.getItem(value);
            return result ? JSON.parse(result) : null;
        },
        remove(value: string) {
            $stor.removeItem(value);
        },
        clear() {
            $stor.clear();
        }
    },
    session: {
        set(value: string, params: any) {
            $sess.setItem(value, JSON.stringify(params));
        },
        get(value: string) {
            const result = $sess.getItem(value);
            return result ? JSON.parse(result) : null;
        },
        remove(value: string) {
            $sess.removeItem(value);
        },
        clear() {
            $sess.clear();
        }
    }
};
