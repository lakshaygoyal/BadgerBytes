import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  Card,
  Button,
  ListGroupItem,
  ListGroup,
  Container
} from "react-bootstrap";
import ItemCard from "./ItemCard";
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: "",
      change: "",
      add: false,
      image: "",
      name: "",
      price: "",
      available: "",
      update: false
    };
    this.change = this.change.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleA = this.handleA.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  change(data) {
    this.setState({ change: data });
  }
  componentDidMount() {
    fetch("https://food-badger.web.app/api/v1/menu", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((x) => {
        this.setState({ menuItems: x });
      });
  }
  getMenuItems() {
    let menu = this.state.menuItems;
    let arr = [];
    if (menu) {
      for (let i = 0; i < menu.length; i++) {
        arr.push(<ItemCard change={this.change} data={menu[i]} />);
      }
      return arr;
    }
    return arr;
  }
  updateItem() {
    this.setState({ update: !this.state.update });
  }
  handleImage(event) {
    this.setState({ image: event.target.value });
  }
  handlePrice(event) {
    this.setState({ price: event.target.value });
  }
  handleName(event) {
    this.setState({ name: event.target.value });
  }
  handleA(event) {
    this.setState({ available: event.target.value });
  }
  async handleSubmit() {
    let obj = {};
    obj = {
      available: this.state.available,
      name: this.state.name,
      image: this.state.image,
      price: this.state.price
    };
    console.log(obj);
    console.log(this.state.id);

    fetch("https://food-badger.web.app/api/v1/menu/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((x) => {
        console.log(x);
        this.updateItem();
      });
  }

  render() {
    if (this.state.update) {
      return (
        <>
          <Container>
            <Card>
              <Card.Title>Create New Menu Item</Card.Title>
              <h6>Image URl:</h6>
              <input
                type="string"
                className="form-control"
                placeholder="URL"
                value={this.state.image}
                onChange={this.handleImage}
                required
              />
              <h6>Name: </h6>
              <input
                type="string"
                className="form-control"
                placeholder="John"
                value={this.state.name}
                onChange={this.handleName}
                required
              />
              <h6>Price: </h6>
              <input
                type="string"
                className="form-control"
                placeholder="5$"
                value={this.state.price}
                onChange={this.handlePrice}
                required
              />
              <h6>Availability (Yes/No): </h6>
              <input
                type="string"
                className="form-control"
                placeholder="Yes"
                value={this.state.available}
                onChange={this.handleA}
                required
              />

              <Button onClick={this.handleSubmit} variant="primary">
                Create New Item
              </Button>
            </Card>
          </Container>
        </>
      );
    }
    return (
      <>
        <Container>
          {this.getMenuItems()}
          <a onClick={this.updateItem} href="#" class="float">
            +
          </a>
        </Container>
      </>
    );
  }
}
