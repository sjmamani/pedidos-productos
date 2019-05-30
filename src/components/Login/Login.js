import React, { Component } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from "axios";
import ReactDOM from 'react-dom';
import './LoginForm.css';
import createHistory from 'history/createBrowserHistory';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import App from '../../App';
//import Navbar from "./components/Navbar/Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      errormsje: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleChange2(event) {
    this.setState({ password: event.target.value });
  }

  submitLogin(e) {
   this.login();
  }

  login(){
    var  headers = {
      'Content-Type': 'application/json'
    }
    var body = {
      'username' : this.state.username,
      'password' : this.state.password
    }
    axios
        .post("http://localhost:8080/login/",body,{headers})
        .then(response => {
          this.setState({ registro: response.data, loading: false });
          console.log(response.data);
          //redirect
          const history = createHistory();
          history.push('/clientes');
          ReactDOM.render(<App />, document.getElementById('root'));
        })
        .catch(error => {
          this.setState({ error: true, loading: false, errors : error });
          console.log(error);
          alert("adios");
        });
  }
  render() {
    return (
      <div className="LoginPage">
       <div className="inner-container">
          <div className="header">
            Login
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange2}/>
            </div>
  
            <button
              type="button"
              className="login-btn"
              onClick={this
              .submitLogin
              .bind(this)}>Login</button>
  
          </div>
        </div>   
      </div>
    );
  }
}
export default Login;