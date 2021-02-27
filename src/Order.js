import React, { Component } from "react";
import OrderItem from "./OrderItem.js";
export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
          payment:"",
          PTime:(new Date).getTime(),
          Time: (new Date).getTime(),
          car: ""
        };
        this.handleChangePayment = this.handleChangePayment.bind(this);
        this.handleChangePTime = this.handleChangePTime.bind(this);
        this.handleChangeCar = this.handleChangeCar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangePayment(event) {
        this.setState({payment: event.target.value});
      }
      handleChangePTime(event) {
        // this.setState({PTime: event.target.value});
      }
      handleChangeCar(event) {
        this.setState({car: event.target.value});
      }

      async handleSubmit(event) {
        console.log("123")
        let obj={

          "time":this.state.Time,
          "carDescription":this.state.car,
        "pickUpTime" : this.state.PTime,
          "food":this.props.data
        }
        console.log(obj)
        fetch('https://food-badger.web.app/api/v1/users/'+this.props.user_id, {
        method: 'POST',
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



      }

      getOrder(){
        
        let orderItem=[];
        for(let x in this.props.data){
          
          orderItem.push(<OrderItem data={this.props.data[x]}/>)
          // console.log(this.props.data[x])
        }

        return orderItem
      }


    render() {
        return (
            <form>
                {this.getOrder()}
                <label>Payment</label><input  className="form-control" placeholder=" Strpieor Paypal"  onChange={this.handleChangePayment} />
                <label>PickupTime</label><input  className="form-control" placeholder=" Enter Pickup Time"  onChange={this.handleChangePTime} />
                <label>Car Description</label><input  className="form-control" placeholder=" Enter Car details"  onChange={this.handleChangeCar} />
                <label onClick={this.handleSubmit}>Submit</label>
            </form>
        );
    }
}