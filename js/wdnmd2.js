let $stor = window.localStorage;
let $sess = window.sessionStorage;

export default {
    ServerBase: 'https://api.xxgcteam.com/analysis',
    // ServerBase: 'wdnmd',
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