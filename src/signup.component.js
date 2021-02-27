import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            phone_number:0,
            username: '',
            password: ''
        };
        this.handleName = this.handleName.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleName(event) {
        this.setState({Name: event.target.value});
      }
      handlePhoneNumber(event) {
        this.setState({phone_number: event.target.value});
      }
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }

      handleSubmit(event) {

        // this.props.xyz(this.state.username,this.state.password, "add-trip")
        alert('A name was submitted: ' + this.state.username+' , '+ this.state.password);
        // event.preventDefault();
      }
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="Name" value={this.state.username} onChange={this.handleName}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="number" className="form-control" placeholder="Phone Number" value={this.state.username} onChange={this.handlePhoneNumber}/>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="email" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.handleChangeUsername}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.username} onChange={this.handleChangePassword}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block"  onClick={this.handleSubmit}>Sign Up</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p> */}
            </form>
        );
    }
}