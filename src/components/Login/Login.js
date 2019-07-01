import React, { Component } from "react";
import axios from "axios";
import "./LoginForm.css";
import { createHashHistory } from "history";
import { Link } from "react-router-dom";

export const history = createHashHistory();

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: [],
      errormsje: ""
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [
        ...prevState.errors,
        {
          elm,
          msg
        }
      ]
    }));
  }

  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
    this.clearValidationErr("login");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
    this.clearValidationErr("login");
  }

  loguearse(headers, body) {
    axios
      .post("http://localhost:8080/login/", body, { headers })
      .then(response => {
        this.setState({ registro: response.data, loading: false });
        console.log(response.data);
        //redirect
        const { history } = this.props;
        history.push("/productos");
      })
      .catch(error => {
        this.setState({ error: true, loading: false, errormsje: error.error });
        console.log(error);
        this.showValidationErr(
          "login",
          "Ocurrio un error en el procedimiento: " +
            error.response.data["message"]
        );
        console.log(JSON.stringify(error.response.data));
      });
  }

  login() {
    if (this.state.username === "") {
      this.showValidationErr("username", "Username Cannot be empty!");
      return;
    }
    if (this.state.password === "") {
      this.showValidationErr("password", "Password Cannot be empty!");
      return;
    }
    var headers = {
      "Content-Type": "application/json"
    };
    var body = {
      username: this.state.username,
      password: this.state.password
    };
    this.loguearse(headers, body);
  }

  render() {
    let usernameErr = null,
      passwordErr = null,
      loginErr = null;

    if (isIterable(this.state.errors)) {
      for (let err of this.state.errors) {
        if (err.elm === "username") {
          usernameErr = err.msg;
        }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
        if (err.elm === "login") {
          loginErr = err.msg;
        }
      }
    }

    return (
      <div className="LoginPage">
        <div className="inner-container">
          <div className="header">Login</div>
          <div className="box">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
              <small className="danger-error">
                {usernameErr ? usernameErr : ""}
              </small>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
              <small className="danger-error">
                {passwordErr ? passwordErr : ""}
              </small>
            </div>
            <div className="forgotPassword">
              <Link to="/cambioPassword">Olvidaste la contraseña?</Link>
            </div>
            <button
              type="button"
              className="login-btn"
              onClick={this.login.bind(this)}
            >
              Login
            </button>
            <small className="danger-error">{loginErr ? loginErr : ""}</small>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
