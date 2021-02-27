import React, { Component } from "react";
import UpdateMenu from "./UpdateMenu.js";
import Order from "./Order.js";
import {  Switch, Route, Link } from "react-router-dom";

export default class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: ''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }

      handleSubmit(event) {

        this.props.xyz(this.state.username,this.state.password, "add-trip")
        // alert('A name was submitted: ' + this.state.username+' , '+ this.state.password);
        // event.preventDefault();
      }


    render() {
        return (
          <>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Badger Bytes</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/update-menu"}>Update Menu</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/orders-print"}>Orders</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
  
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route exact path='/update-menu' render={()=> <UpdateMenu xyz={(id, state_temp) => this.xyz(id, state_temp)}/>} />
                  <Route exact path='/update-menu' render={()=> <UpdateMenu xyz={(id, state_temp) => this.xyz(id, state_temp)}/>} />
                  <Route path="/orders-print" component={Order} />
                </Switch>
              </div>
            </div>
          </div>
          </>
        );
    }
}