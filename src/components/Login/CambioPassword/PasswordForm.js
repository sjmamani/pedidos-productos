import React from "react";
export class PasswordForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            password:this.props.password,
            pwdState:null,
            name:this.props.name,
            label:this.props.label,
            onPasswordChange:this.props.onPasswordChange
        }
        

    }

      /**Evento password */
      onPasswordChange(e) {
        var pass = e.target.value;
        this.setState({password: pass});
        this.props.onPasswordChange(pass);
  
        this.setState({pwdState: "weak"});
        if (e.target.value.length > 8 && e.target.value.length<=12 ) {
        this.setState({pwdState: "medium"});
        } else if (e.target.value.length > 12) {
        this.setState({pwdState: "strong"});
        }
    }

    render(){
      /*var password = this.state.password;
      var password = React.createRef();*/

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

      return(
        <div className="input-group">
              <label htmlFor={this.state.name}>{this.state.label}</label>
              <input
                type="password"
                name={this.state.name}
                className="login-input"
                placeholder={this.state.label}
                onChange={this
                .onPasswordChange
                .bind(this)}/>
              
  
              {this.state.password && 
              <div className="password-state">
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
                  : "")}>
                </div>
              </div>}
  
            </div>
      );
    }
}

/*<small className="danger-error">{passwordErr
                  ? passwordErr
                  : ""}</small>*/