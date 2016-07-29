/**
 * Created by rob on 7/21/16.
 */

import axios from 'axios'
var jwt = require('express-jwt');

module.exports = function (deps) {

    const app = deps.app;
    const config = deps.config;
    const notSecret = 'not_so_much';


    var guard = jwt({ secret: notSecret});

    var listener = require('../services/PubsubListener')(deps);


    app.get('/api/messages', guard, (req, res) => {
    
        listener.getCreateSubscription(req.user.user._id, (err, sub)=>{
            listener.pull(req.user.user._id,(err, some)=>{
                console.log(err, some);
                res.json(some);

            });
        });
    });

    app.post('/api/createUser', (req, res) => {

        axios.post(config.AUTH_URL + '/createUser', req.body)
            .then(user => {return res.json(user.data);})
            .catch(reason => {
                console.log(reason.data);
                return res.status(reason.status).json(reason.data);});
    });

    app.post('/api/auth', (req, res) => {

        axios.put(config.AUTH_URL + '/auth', req.body)
            .then(user => {res.json(user.data);})
            .catch(reason => {return res.status(reason.status).json(reason.data);});
    });

    app.post('/api/proxy', guard,(req, res) =>{
        listener.ack(req.user.user._id, req.body.ackId, (err, o)=>{
            console.log(err, o);
            const url = req.body.PROXY_URL;
            const method = req.body.PROXY_METHOD;
            delete req.body.PROXY_URL;
            delete req.body.PROXY_METHOD;

            axios[method](url, req.body)
                .then(r =>{ return res.json(r.data)})
                .catch(reason => {return res.status(reason.status).json(reason.data);})

        });



        return res.json({"OK":"OK"});

    })


};
