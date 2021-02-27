import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {  Switch, Route, Link } from "react-router-dom";
import Menu from "./Menu.js";
import Order from "./Order.js";
import Profile from "./Profile.js";


export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            food:[]
        };
        // this.handleChangeUsername = this.handleChangeUsername.bind(this);
        // this.handleChangeFood = this.handleChangeFood.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      handleChangeFood(d) {
          console.log(d)
        this.setState({food: d});
      }

      


    render() {
        return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Badger Bytes</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/customer/menu"}>Menu</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/customer/order"}>Order</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/customer/profile"}>Profile</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            <div className="auth-wrapper">
                <div className="auth-inner1">
                <Switch>
                    {/* <Route exact path='/' render={()=> <Login xyz={(username_temp,pwd_temp, state_temp) => this.handleLogIn(username_temp,pwd_temp, state_temp)}/>} />
                    <Route exact path='/sign-in' render={()=> <Login xyz={(username_temp,pwd_temp, state_temp) => this.handleLogIn(username_temp,pwd_temp, state_temp)}/>} />
                    <Route path="/sign-up" component={SignUp} /> */}

                    <Route exact path='/customer' render={()=> <Menu data={this.state.menu} handleFood={(d)=>this.handleChangeFood(d)}/>} />

                    <Route exact path='/customer/menu' render={()=> <Menu data={this.state.menu} user_id={this.state.id} handleFood={(d)=>this.handleChangeFood(d)}/>} />
                    
                    <Route exact path='/customer/order' render={()=> <Order data={this.state.food} user_id={this.state.id} />} />

                    <Route exact path='/customer/profile' render={()=> <Profile user_id={this.state.id} />} />
                </Switch>
                </div>
            </div>
        </div>
        );
    }
}