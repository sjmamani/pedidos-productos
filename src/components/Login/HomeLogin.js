import React from "react";
//import ReactDOM from 'react-dom'

//import TransitionGroup from "react-transition-group";

import FadeTransition from "./transitions/FadeTransition";
import RegisterBox from "./RegisterBox";
import Login from "./Login";


class HomeLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLogin() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  render() {

    return (
      <div className="root-container">

        <div className="box-controller">
          <div
            className={"controller " + (this.state.isLoginOpen
            ? "selected-controller"
            : "")}
            onClick={this
            .showLogin
            .bind(this)}>
            Login
          </div>
          <div
            className={"controller " + (this.state.isRegisterOpen
            ? "selected-controller"
            : "")}
            onClick={this
            .showRegisterBox
            .bind(this)}>
            Register
          </div>
        </div>
 
        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
          <div className="box-container">
            <Login history={this.props.history}/>
          </div>
        </FadeTransition>
        <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
          <div className="box-container">
            <RegisterBox/>
          </div>
        </FadeTransition>

      </div>
    );

  }

}



export default HomeLogin;
