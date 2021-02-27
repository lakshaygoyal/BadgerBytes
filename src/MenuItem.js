import React, { Component } from "react";
import './style.css';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            id: "",
            quantity: 1,
            price: 0.0,
            now: new Date()
        };
        // this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount(){
        this.setState({
          data:this.props.data.data,
          id: this.props.data.id,
          quantity: 1,
          price: this.props.data.price,
          now: new Date()

        })
          // console.log(this.props.data)
      }
      
      handleChangeQuantity(event) {
        this.setState({quantity: event.target.value});

      }

      handleSubmit() {
        const d = {
          "quantity": this.state.quantity,
          "price": this.state.data.price,
          "name":this.state.data.name,
         "foodId": this.state.id,
         
      }
      console.log(d)
      this.props.addtocart(d)

        
      }
      
  


    render() {
        return (
          <div id="maindiv">
            <div id="divone">
                <img id="image" src={this.state.data.image} alt="Trulli" width="500" height="333"/>
            </div>

            <div id="divtwo">
              <p id="menuname">{this.state.data.name}</p>
              <p id="price">{this.state.data.price}</p>
              <div id="buttons">
              <form >
              {/* <button class="add-button" >Add to Cart!</button> */}
              {/* <button  className="btn btn-primary btn-block" onClick={this.handleSubmit} >Submit</button> */}
              <label onClick={this.handleSubmit}>Add to Cart</label>
              <div id="quantity">
                <input id="demoInput" type="number" step="1" min="1" max="" name="quantity"  placeholder="1" title="Qty" class="inputtext" size="6" pattern="" inputmode="" onChange={this.handleChangeQuantity}/>
              </div>
              </form>

              </div>
            </div>
        </div>
        );
    }
}