import React, { Component } from 'react';
import { Button as button, Input as input } from 'reactstrap';
import './LoginForm.css';

class LoginForm extends Component {
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
    alert("Que ace? " + this.state.username + " " + this.state.password );
  }

  render() {
    return (
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
    )
  }
}
export default LoginForm;
/* <div style={divStyle}>
        <panel style={panelStyle}>
          <form horizontal className="LoginForm" id="loginForm">
            <formgroup class="form-group" controlId="formEmail">
              <input class="form-control" type="email" placeholder="Email Address" /> 
            </formgroup>
            <formgroup class="form-group" controlId="formPassword">
              <input class="form-control" type="password" placeholder="Password" />
            </formgroup>
            <formgroup class="form-group" style={buttonStyle} controlId="formSubmit">
              <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
            </formgroup>
          </form>
        </panel>
      </div>*/