axios.jsonp = (url, data) => {
    if (!url)
        throw new Error('url is necessary')
    const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
    const JSONP = document.createElement('script')
    JSONP.setAttribute('type', 'text/javascript')

    const headEle = document.getElementsByTagName('head')[0]

    let ret = '';
    if (data) {
        if (typeof data === 'string')
            ret = '&' + data;
        else if (typeof data === 'object') {
            for (let key in data)
                ret += '&' + key + '=' + encodeURIComponent(data[key]);
        }
        ret += '&_time=' + Date.now();
    }
    JSONP.src = `${url}?callback=${callback}${ret}`;
    return new Promise((resolve, reject) => {
        window[callback] = r => {
            resolve(r)
            headEle.removeChild(JSONP)
            delete window[callback]
        }
        headEle.appendChild(JSONP)
    })
}

new Vue({
    el: '#Search',
    data: {
        test: 'wdnmd'
    },
    created() {
        // this.getBing();
    },
    methods: {
       
    }
})