import React from "react";
import axios from "axios";
class RegisterBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        errors:[],
        pwdState: null
      };
    }
  
    showValidationErr(elm, msg) {
      this.setState((prevState) => ({
        errors: [
          ...prevState.errors, {
            elm,
            msg
          }
        ]
      }));
    }
  
    /**
     * Si hay un error, se borrara cuando ingrese algo
     */
    clearValidationErr(elm) {
      this.setState((prevState) => {
        let newArr = [];
        for (let err of prevState.errors) {
          if (elm !== err.elm) {
            newArr.push(err);
          }
        }
        return {errors: newArr};
      });
    }
  
    /**Evento username */
    onUsernameChange(e) {
      this.setState({username: e.target.value});
      this.clearValidationErr("username");
    }
  
    /**Evento password */
    onPasswordChange(e) {
      this.setState({password: e.target.value});
      this.clearValidationErr("password");
  
      this.setState({pwdState: "weak"});
      if (e.target.value.length > 8 && e.target.value.length<=12 ) {
        this.setState({pwdState: "medium"});
      } else if (e.target.value.length > 12) {
        this.setState({pwdState: "strong"});
      }
  
    }
  
    /**Evento boton registrar */
    submitRegister(e) {
  
      console.log(this.state);
  
      if (this.state.username === "") {
        this.showValidationErr("username", "Username Cannot be empty!");
        return;
      }
      if (this.state.password === "") {
        this.showValidationErr("password", "Password Cannot be empty!");
        return;
      }
  
      /*Api call*/
      this.registrar();
    }

    registrar(){
      var  headers = {
        'Content-Type': 'application/json'
      }
      var body = {
        'username' : this.state.username,
        'password' : this.state.password
      }
      console.log(body);
      
      axios
          .post("http://localhost:8080/registrar/",body,{headers})
          .then(response => {
            this.setState({ registro: response.data, loading: false });
            console.log(response.data);
            alert("Se ha registrado el usuario");
          })
          .catch(error => {
            this.setState({ error: true, loading: false });
            this.showValidationErr("password", "Ocurrio un error en el procedimiento: " + error.response.data["message"]);
            console.log(JSON.stringify(error.response.data));
          });
    }
     
  
    render() {
      let usernameErr = null,
        passwordErr = null;
  
      for (let err of this.state.errors) {
        if (err.elm === "username") {
          usernameErr = err.msg;
        }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
      }
  
      let pwdWeak = false,
        pwdMedium = false,
        pwdStrong = false;
  
      if (this.state.pwdState === "weak") {
        pwdWeak = true;
      } else if (this.state.pwdState === "medium") {
        pwdWeak = true;
        pwdMedium = true;
      } else if (this.state.pwdState === "strong") {
        pwdWeak = true;
        pwdMedium = true;
        pwdStrong = true;
      }
  
      return (
        <div className="inner-container">
          <div className="header">
            Register
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                onChange={this
                .onUsernameChange
                .bind(this)}/>
              <small className="danger-error">{usernameErr
                  ? usernameErr
                  : ""}</small>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={this
                .onPasswordChange
                .bind(this)}/>
              <small className="danger-error">{passwordErr
                  ? passwordErr
                  : ""}</small>
  
              {this.state.password && <div className="password-state">
                <div
                  className={"pwd pwd-weak " + (pwdWeak
                  ? "show"
                  : "")}></div>
                <div
                  className={"pwd pwd-medium " + (pwdMedium
                  ? "show"
                  : "")}></div>
                <div
                  className={"pwd pwd-strong " + (pwdStrong
                  ? "show"
                  : "")}></div>
              </div>}
  
            </div>
  
            <button
              type="button"
              className="login-btn"
              
              onClick={this
              .submitRegister
              .bind(this)}>Register</button>
  
          </div>
        </div>
  
      );
  
    }
  
  }

export default RegisterBox;