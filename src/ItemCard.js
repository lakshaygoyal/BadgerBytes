import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Container,
  Button
} from "react-bootstrap";

export default class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.data,
      image: this.props.data.data.image,
      name: this.props.data.data.name,
      price: this.props.data.data.price,
      available: this.props.data.data.available,
      id: this.props.data.id,
      update: false
    };
    this.updateItem = this.updateItem.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleA = this.handleA.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }
  updateItem() {
    this.setState({ update: !this.state.update });
  }
  // componentDidMount() {
  //   fetch("https://food-badger.web.app/api/v1/menu", {
  //     method: "GET"
  //   })
  //     .then((res) => res.json())
  //     .then((x) => {
  //       this.setState({ menuItems: x });
  //     });
  // }
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

    fetch("https://food-badger.web.app/api/v1/menu/" + this.state.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((x) => {
        console.log(x);
        this.updateItem();
        this.props.change("1");
      });
  }

  render() {
    if (this.state.update === true) {
      return (
        <>
          <Card >
            <Card.Title>Edit Details</Card.Title>
            <h6>Image URl:</h6>
            <input
              type="string"
              className="form-control"
              placeholder={this.state.image}
              value={this.state.image}
              onChange={this.handleImage}
            />
            <h6>Name: </h6>
            <input
              type="string"
              className="form-control"
              placeholder={this.state.name}
              value={this.state.name}
              onChange={this.handleName}
            />
            <h6>Price: </h6>
            <input
              type="string"
              className="form-control"
              placeholder={this.state.price}
              value={this.state.price}
              onChange={this.handlePrice}
            />
            <h6>Availability (Yes/No): </h6>
            <input
              type="string"
              className="form-control"
              placeholder={this.state.available}
              value={this.state.available}
              onChange={this.handleA}
            />

            <Button onClick={this.handleSubmit} variant="primary">
              Send Changes
            </Button>
            <Button onClick={this.updateItem} variant="danger">
              Cancel Edit
            </Button>
          </Card>
        </>
      );
    }
    return (
      <>
        <Card >
          <Card.Img variant="top" fluid src={this.state.data.image} />
          <Card.Body>
            <Card.Title>{this.state.data.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>PRICE : {this.state.data.price}</ListGroupItem>
            <ListGroupItem>
              AVAILABLE: {this.state.data.available}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link onClick={this.updateItem} href="javascript:void(0)">
              Edit Details
            </Card.Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}
