/**
 * Created by rob on 5/10/16.
 */

import test from 'ava';
var actions = require('../../src/actions/Workflow');

test("The action applies a default Simple widget", t=>{

    var _in = {data:{}};
    var out = actions.created(_in);
   t.deepEqual(out, {widget:"Simple",cid:undefined});
});


test('We can process form fields', t=>{

    const _in =[{"id":"form_email","label":"Email","type":{"name":"string"},"defaultValue":null,"value":{"value":null,"type":{"name":"string","javaType":"java.lang.String","primitiveValueType":true,"abstract":false,"parent":null}},"validationConstraints":[],"properties":{},"typeName":"string"}];
    t.pass();

});
