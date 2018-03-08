import React, { Component } from 'react';
import Fundraisers from './Fundraisers/Fundraisers';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

class Donate extends Component {
  state = {
    fundraisers: null,
    error: null,
    cart: []
  };
  componentDidMount() {
    this.getAllFundraisers();
  }

  getAllFundraisers = () => {
    axios
      .get('http://localhost:8080/api/getallfundraisers')
      .then(data => {
        this.setState({ fundraisers: data.data.data });
      })
      .catch(err => {
        this.setState({
          error:
            'there was an error fetching fundraisers, please refresh the page'
        });
      });
  };

  addToCart = event => {
    const cart = [...this.state.cart];
    cart.push(JSON.parse(event.target.value));
    this.setState({ cart });
  };

  render() {
    return (
      <div>
        <h1>This is the donationd page</h1>
        <div>
          <LinkContainer to={'/cart/' + JSON.stringify(this.state.cart)}>
            <button className="btn btn-primary btn-lg mb-3">Go to cart</button>
          </LinkContainer>
        </div>
        <Fundraisers
          error={this.state.err}
          fundraisers={this.state.fundraisers}
          onToken={this.onToken}
          addToCart={this.addToCart}
          self={this}
        />
      </div>
    );
  }
}

export default Donate;
