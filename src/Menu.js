import React, { Component } from "react";
import MenuItem from "./MenuItem.js";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id:'',
          menu:[],
          food:[]
        };
        
      }
      componentDidMount(){
        this.loadInitialState()
      }

      async loadInitialState(){
       
        fetch('https://food-badger.web.app/api/v1/menu', {
        method: 'GET',
        headers: { 'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({menu: data});
            
        
      })
        
      }

      addtoCart(d){
        var temp_var = [];
        temp_var= this.state.food;
        temp_var.push(d)
        console.log( temp_var)

        this.props.handleFood(temp_var);


      }




      getMenuItems(){
        let menuitems = [];
        for(const x in this.state.menu){
            menuitems.push (
              <MenuItem key ={x} data={this.state.menu[x]} addtocart={(d)=>this.addtoCart(d)}/>
            )
          }
        return menuitems;
      }

      


    render() {
        return (
            <div>
                <div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
                {this.getMenuItems()}
                
            </div>
        );
    }
}