/**
 * Created by rob on 7/21/16.
 */


var axios = require('axios');

// https://github.com/sindresorhus/is-absolute-url/blob/master/index.js#L7
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;


export function checkLogin() {

    return JSON.parse(localStorage.getItem('authInfo'));

}


export function login(authToken) {

    localStorage.setItem('authInfo',  JSON.stringify(authToken));

}

export function setupAjax(proxyUrl){

    /**
     * Add an a header, rewrite external urls to a proxy endpoint
     */
    axios.interceptors.request.use(function (config) {
        _handleAuthHeader(localStorage, config);
        _handleProxy(proxyUrl, config);
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    /**
     * If the server gives us a 401, go back to the login page
     */
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.status ==401){
            localStorage.removeItem('authInfo');
            window.location.assign('/login');

        }
        return Promise.reject(error);
    });
}

export function _handleProxy (proxyUrl, config) {

    if (isAbsoluteURLRegex.test(config.url) ) {
        var _in = config.data ? JSON.parse(config.data): {};
        var data = Object.assign(_in,
            {
                PROXY_METHOD:config.method,
                PROXY_URL: config.url
            });
        config.method = 'post';
        config.url = proxyUrl;
        config.data = JSON.stringify(data);
    }

}


export function _handleAuthHeader (someLocalStorage, config) {

        let auth = JSON.parse(someLocalStorage.getItem('authInfo'));
        if (auth)
            config.headers.authorization = 'Bearer ' + auth.token;
}


