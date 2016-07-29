/**
 * Created by rob on 7/22/16.
 */
import test from 'ava'
import axios from 'axios'
import {setupAjax, _handleAuthHeader, _handleProxy} from '../../../src/common/services/AuthService'

test.before(()=>{

    global.localStorage = {
        getItem: ()=> {
            return null
        }
    };

});

test("The helper adds the auth header",  t=> {

    var somStorage = {
        getItem: ()=> {
            return '{"token":"foo"}'
        }
    };

    var config = {headers:{}};

    _handleAuthHeader(somStorage, config);
    t.deepEqual(config.headers, { authorization: 'Bearer foo' });
});

test("Not if there is no token in local storage",  t=> {

    var config = {headers:{}};

    _handleAuthHeader(global.localStorage, config);
    t.deepEqual(config.headers, { });
});


test("remaps the external urls to the proxy",  t=> {
    var config = {url: 'http://echo.jsontest.com/key/value/one/two',
                   method: 'get' };
    _handleProxy('/foo', config);
    t.is(config.url, '/foo');
    t.is(config.method, 'post');
    var data  = JSON.parse(config.data);
    t.is(data.PROXY_METHOD, 'get');
    t.is(data.PROXY_URL, 'http://echo.jsontest.com/key/value/one/two');
});


test("Leaves internal urls alone",  t=> {
    var config = {url: '/foo'};
    _handleProxy('/foo', config);
    t.deepEqual(config, { url: '/foo' });
});




test("smoke test for everything working with proxy", async t=> {

    setupAjax('https://echo.getpostman.com/post');
    var res = await axios.post("https://github.com/avajs/ava#documentation",
        {"userName": "heyho"});
    t.deepEqual(res.data.data, {
        userName:"heyho",
        PROXY_METHOD:"post",
        PROXY_URL:"https://github.com/avajs/ava#documentation"
    });
});


test("smoke test for everything working without proxy", async t=> {

    setupAjax('https://echo.getpostman.com/post');
    t.throws(axios.post("foo",
        {"userName": "heyho"}));

});









