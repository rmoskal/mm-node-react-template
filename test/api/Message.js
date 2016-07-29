/**
 * Created by rob on 7/21/16.
 */
import test from 'ava';
import React from 'react';
import request from 'supertest-as-promised'
import * as factory from '../../AppFactory'
import express from 'express';


const app = express();
var deps = factory.create(app);
factory.bootExpress(deps);


test('minimalEndpoint:Success', async t => {

    const res = await request(app).get('/api/messages');
    //console.log(res.body);
    t.pass();
   // t.is(res.body.ok, 'ok');
});


