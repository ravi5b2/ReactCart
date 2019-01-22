import React, { Component } from 'react';
import { fakeAuth } from '../utils';
import './login.css';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import actions from '../store/actions';
class Login extends React.Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
            this.props.switchLogin();

        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        // let { redirectToReferrer } = this.state;

        if (this.state.redirectToReferrer) return <Redirect to={from} />;

        return (
            <div className="login-page">
                <h3>Please Login to Continue </h3>
                <div className="form">
                    <div className="login-form">
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <button onClick={this.login}>login</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{

    return {
      appName : state.appName,
      isLoggedIn : state.isLoggedIn,
      cart :state.cart
    }
  }
  
  const dispatchToProps = (dispatch)=>{
    return {
      switchLogin: () => {
        dispatch({ type: actions.IS_LOGGED_IN })
    }
    }
  }
  export default connect(mapStateToProps,dispatchToProps)(Login);
