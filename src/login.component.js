import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          acess:''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeAcess = this.handleChangeAcess.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
      handleChangeAcess(event) {
        this.setState({acess: event.target.value});
      }

      handleSubmit(event) {
        this.props.xyz('EkkMZ6LEcu7Pbfod24J3', this.state.acess)

        // fetch('https://worker.chokkarapu.workers.dev/signIn', {
        //   method: 'POST',
        //   headers: { 
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*'
        //           },
        //     body:  JSON.stringify({"email":this.state.username,"password":this.state.password})
        //   })
        //   .then(res => res.json())
        //   .then(x => {
        //     if('id' in x){
        //       console.log(x.id)
        //       this.props.xyz(x.id, 'Customer')
        //       this.setState({
        //         id: x.id
        //     });
        //     }
        //     else{
        //       alert("Username or Password not correct.")
        //     }
        // })
      }

      


    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="email" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.handleChangeUsername} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChangePassword} />
                </div>
                <div className="form-group">
                    <label>Access</label>
                    <input  className="form-control" placeholder="Enter Acess" value={this.state.acess} onChange={this.handleChangeAcess} />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <label  onClick={this.handleSubmit} >Submit</label>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        );
    }
}