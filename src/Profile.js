import React, { Component } from "react";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id:this.props.user_id,
          name:"",
          address:"",
          phone: "",
          username:"",
          password:"",
          type:""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount(){
          this.loadInitialState();
      }
      async loadInitialState(){
       
        fetch('https://food-badger.web.app/api/v1/users/'+this.state.id, {
        method: 'GET',
        headers: { 'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*'}
        })
        .then(res => res.json())
        .then(x => {
            console.log(x.data.username)
            this.setState({
                name:x.data.name,
                address:x.data.address,
                phone: x.data.phone,
                username:x.data.username,
                password:x.data.password,
                type:x.data.type
            });
            
        
      })
        
      }

      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
      handleChangeAddress(event) {
        this.setState({address: event.target.value});
      }
      handleChangePhone(event) {
        this.setState({phone: event.target.value});
      }
      handleChangeName(event) {
        this.setState({name: event.target.value});
      }

      async handleSubmit() {
        //   console.log("sdfs")
          let obj ={};
          obj = {
                username:this.state.username, 
                password:this.state.password, 
                phone: this.state.phone,
                address:this.state.address, 
                type:this.state.type,
                name:this.state.name,
        }


        fetch('https://food-badger.web.app/api/v1/users/'+this.state.id, {
        method: 'PUT',
        headers: { 
                    'Content-Type': 'application/json' },
        
        body:  JSON.stringify(
            obj
          )
            
        })
        .then(res => res.json())
        .then(x => {
            console.log(x)
            
            
        
      })

        
        // alert('A name was submitted: ' + this.state.username+' , '+ this.state.password);
        // event.preventDefault();
      }


    render() {
        return (

            <div>
                <h3> Profile Page</h3>
                {/* {if(this.state.date !==)
                (
                    <p>{this.state.data.data.address}</p>
                )} */}
                {/* {this.state.data.data.phone} */}
                {/* <h2>Name: </h2> <p>Not in the api data</p> */}
                <h2>Name:</h2><input type="email" className="form-control" placeholder={this.state.name}  onChange={this.handleChangeName} /> 
                <h2>Address: </h2><input  className="form-control" placeholder={this.state.address}   onChange={this.handleChangeAddress} />
                <h2>Phone Number: </h2><input type="number" className="form-control" placeholder={this.state.phone}   onChange={this.handleChangePhone} />
                <h2>Username: </h2><input type="email" className="form-control" placeholder={this.state.username}  value={this.state.username} onChange={this.handleChangeUsername} />
                <h2>Password: </h2><input type="password" className="form-control" placeholder={this.state.password}  value={this.state.password} onChange={this.handleChangePassword} />
                <h2>Type </h2><p>{this.state.type}</p>
                <label onClick={()=>this.handleSubmit()}>Submit</label>
            </div>
            
        );
    }
}