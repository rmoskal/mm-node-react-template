import axios from 'axios'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import HomePage from '../../pages/home'
import LoginPage from '../../pages/login'
import * as Auth from '../services/AuthService'
var actions = require('../../actions/Workflow');



export function guardPath(component) {


    var creds = Auth.checkLogin();

   if (! creds)
        return LoginPage;

    Auth.setupAjax("/api/proxy");

   /* axios.get('/api/messages')
        .then(res =>{
            console.log(res.data);
            res.data.map(each=>{
                actions.created(each);
            })})
        .catch(reason =>{ console.log(reason)}); */

    setInterval(()=>{

        axios.get('/api/messages')
            .then(res =>{
                console.log(res.data);
                res.data.map(each=>{
                    actions.created(each);
                })})
            .catch(reason =>{ console.log(reason)});


    },3000);



    return component;
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={guardPath(HomePage)} />
    <Route path="login" component={LoginPage}/>
  </Route>
);
