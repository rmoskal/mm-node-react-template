import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios'
import {login} from '../common/services/AuthService'



export default class LoginPage extends React.Component {


  signUp() {
    var field = document.getElementById("foo");
    if (field.value) {
        axios.post('/api/createUser', {userName: field.value})
            .then(res =>{
                login(res.data);
                window.location.assign('/');
            })
            .catch(res =>{
               console.log('++++++++++++++++++++', res);
            });

    }

  }
  
  render() {
    return (
      <div className="foo">
        <h1 className="foo">Login Page</h1>
        <p className="foo">Create an account to get started!</p>
        <input id="foo"/>
        <button className="foo" onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
}
