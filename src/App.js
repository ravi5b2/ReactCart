import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './products/index';
import Cart from './cart/index';
import Login from './login/index';
import { BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
 } from "react-router-dom";
import {fakeAuth} from './utils';
import {connect} from 'react-redux';
import { stat } from 'fs';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to= {{
        pathname: '/login',
        state: { from: props.location }
      }}
       />
  )} />
)
// const AuthButton = withRouter(({ history }) => (
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome! <button onClick={() => {
//         fakeAuth.signout(() => history.push('/'))
//       }}>Sign out</button>
//     </p>
//   ) : null
  
// ))

class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      status  : fakeAuth.isAuthenticated
    }
    this.LogOut = this.LogOut.bind(this);
  }
  LogOut(){
    fakeAuth.signout();
    this.props.history.push("/")
  }
  render() {
    const { match, location, history } = this.props;
    return (
      <div className="">
      <Router>
          <div>
            <nav>
              <ul>
                <li id="home">
                  <Link to="/">Home</Link>
                </li>
                { this.props.isLoggedIn?
                  <li className="cart">
                  <Link to="/cart" onClick={this.LogOut}>Logout</Link>
                </li> : <li className="cart">
                  <Link to="/login" >Login</Link>
                </li>
                }
                <li className="cart">
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </nav>
            <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/login" component={Login} />
            <PrivateRoute path='/cart' component={Cart} />
            <Redirect from="*" to="/" />
            </Switch>
          </div>
        </Router>
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
      dispatch({ type: 'isLoggedIn' })
  }
  }
}
export default connect(mapStateToProps,dispatchToProps)(App);
