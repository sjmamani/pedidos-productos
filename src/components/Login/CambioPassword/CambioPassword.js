import React from "react";
import axios from "axios";
import { PasswordForm } from "./PasswordForm";
import './Form.css' 

class CambioPassword extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        passwordConfirm: "",
        errors:[],
        pwdState: null
      };
      this.onUsernameChange = this.onUsernameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
      this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
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
     onPasswordChange(pass) {
      this.setState({password:pass});
      this.clearValidationErr("password"); 
     }

      /**Evento password */
    onPasswordConfirmChange(pass) {
      this.setState({passwordConfirm: pass});
      this.clearValidationErr("passwordConfirm"); 
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
      if (this.state.passwordConfirm === "") {
        this.showValidationErr("passwordConfirm", "Password Confirmation Cannot be empty!");
        return;
      }
      if (this.state.password !== this.state.passwordConfirm) {
        this.showValidationErr("passwordConfirm", "Password Must be equals!");
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

      axios
          .post("http://localhost:8080/cambioPassword/",body,{headers})
          .then(response => {
            alert("Cambio de password exitoso, redirigiendo a login");
            //redirect
            const { history } = this.props;
            history.push("/")
          })
          .catch(error => {            
            this.showValidationErr("passwordConfirm", "Ocurrio un error en el procedimiento: " + error.response.data["message"]);
            console.log(JSON.stringify(error.response.data));
          });
    }
     
  
    render() {
      let usernameErr = null,
        passwordErr = null,
        passwordConfirmErr = null;
  
      for (let err of this.state.errors) {
        if (err.elm === "username") {
          usernameErr = err.msg;
        }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
        if (err.elm === "passwordConfirm") {
          passwordConfirmErr = err.msg;
        }
      }
  
      return (
        <div className="inner-container">
          <div className="header">
            Cambio Password
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

            <PasswordForm password={this.state.password} 
                  label="Password"
                  name= "password"
                  onPasswordChange = {this.onPasswordChange}
                  />
              <small className="danger-error">{passwordErr
                  ? passwordErr
                  : ""}</small>

           <PasswordForm password={this.state.passwordConfirm} 
                  label="Password Confirmation"
                  name= "passwordConfirm"
                  onPasswordChange = {this.onPasswordConfirmChange}
                  />
                   <small className="danger-error">{passwordConfirmErr
                  ? passwordConfirmErr
                  : ""}</small>
            <button
              type="button"
              className="login-btn"
              
              onClick={this
              .submitRegister
              .bind(this)}>Actualizar contraseña</button>
  
          </div>
        </div>
  
      );
  
    }
  
  }

export default CambioPassword;