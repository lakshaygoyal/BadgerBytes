
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {  Switch, Route, Link } from "react-router-dom";


import Login from "./login.component";
import SignUp from "./signup.component";
import Customer from "./Customer.js";
import Admin from "./Admin.js";
import Staff from "./Staff.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      id:'EkkMZ6LEcu7Pbfod24J3',
      state_var: 'admin',
    };
  }

  xyz(id, state_temp){
    this.setState({id:id, state_var:state_temp})

    alert('A name was submitted: '+ id+ " "+ state_temp  );
  }
  

render(){
  return (
    <>
      {this.state.state_var === 'start' && (<>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>Badger Bytes</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' render={()=> <Login xyz={(id, state_temp) => this.xyz(id, state_temp)}/>} />
                <Route exact path='/sign-in' render={()=> <Login xyz={(id, state_temp) => this.xyz(id, state_temp)}/>} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
        </>
        )}

      {this.state.state_var === 'customer' && (
        <Customer id={this.state.id}/>
      )}
      {this.state.state_var === 'admin' && (
        <Admin id={this.state.id}/>
      )}
      {this.state.state_var === 'staff' && (
        <Staff id={this.state.id}/>
      )}
    </>
  );
  }
}

export default App;
