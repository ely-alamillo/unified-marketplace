import React, { Component } from 'react';
import axios from 'axios';
import StripePay from '../StripePay/StripePay';

class Cart extends Component {
  state = {
    donations: [],
    currValue: '',
    disabled: true
  };

  componentDidMount() {
    const donations = JSON.parse(this.props.match.params.donations);
    this.setState({ donations });
  }

  onToken = token => {
    const owners = [
      this.state.donations[0].owner,
      this.state.donations[1].owner
    ];
    console.log('owners: ', owners);
    console.log('token: ', token);
    axios
      .post('http://localhost:8080/api/donate', {
        token: token.id,
        owners,
        amount: this.state.currValue
      })
      .then(res => {
        console.log('res: ', res);
      })
      .catch(err => {
        console.log('ther was an error', err);
      });
  };

  changeValue = value => {
    console.log('val: ', value);
    this.setState({ currValue: value });
  };

  render() {
    return (
      <div>
        <h1>this is the cart</h1>
        <div>
          {this.state.donations.length > 0 ? (
            this.state.donations.map(donate => {
              return (
                <div className="card-body">
                  <h5 className="card-title">{donate.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {donate.owner}
                  </h6>
                  <p className="card-text">
                    Some description of the fundraiser.
                  </p>
                  {/* <StripePay onToken={props.onToken} self={props.self} /> */}
                </div>
              );
            })
          ) : (
            <h1>The cart is empty</h1>
          )}
        </div>
        <div className="form-group">
          <label className="text-muted text-muted">Donate</label>
          <input
            className="form-control mb-1"
            type="text"
            value={this.state.currValue}
            style={{ marginRight: '5px' }}
            placeholder="Enter donation amount"
            onChange={event =>
              this.setState({ currValue: event.target.value, disabled: false })
            }
          />
          <small className="form-text text-muted">
            Please enter whole numbers, any decimals will be rounded down.
          </small>
        </div>
        <StripePay
          onToken={this.onToken}
          self={this}
          disabled={this.state.disabled}
        />
        <script src="https://js.stripe.com/v3/" />
        <div id="payment-request-button"> Hello</div>
      </div>
    );
  }
}

export default Cart;
