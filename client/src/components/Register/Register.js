import React, { Component } from 'react';
import Account from './Account/Account';
import Profile from './Profile/Profile';
import Payment from './Payment/Payment';
import axios from 'axios';
import { firebaseApp } from '../../Firebase';

class Register extends Component {
  state = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    postCode: '',
    city: '',
    country: 'United States',
    StripeDisabled: true,
    registerSuccess: false,
    error: {
      message: ''
    }
  };

  signUp = () => {
    const { email, password, firstname, lastname } = this.state;
    const user = { email, password, firstname, lastname };
    axios
      .post('http://localhost:8080/api/register', user)
      .then(data => {
        console.log('data: ', data);
        // this.setState({
        //   StripeDisabled: false,
        //   registerSuccess: true,
        //   email: '',
        //   password: '',
        //   firstname: '',
        //   lastname: '',
        //   city: '',
        //   postCode: ''
        // });
        this.setState({
          StripeDisabled: false,
          registerSuccess: true
        });
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };

  createAccount = () => {
    const { email, firstname, lastname } = this.state;
    const user = { email, firstname, lastname };
    console.log('user:', user);
    axios
      .post('http://localhost:8080/api/stripe-register', user)
      .then(data => {
        console.log('data: ', data.data);
        window.location = data.data.uri;
      })
      .catch(err => [console.log('error on create account ', err)]);
  };

  render() {
    return (
      <div>
        <h1>Register Creation</h1>
        <hr />

        <Account
          self={this}
          signUp={this.signUp}
          password={this.state.password}
          email={this.state.email}
          error={this.state.error}
        />
        <hr />
        <Profile
          self={this}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          postCode={this.state.postCode}
          city={this.state.city}
          country={this.state.country}
        />
        <hr />
        <button
          className="btn btn-primary mr-3"
          type="button"
          onClick={() => this.signUp()}
        >
          Create Account
        </button>
        <Payment
          disabled={this.state.StripeDisabled}
          createAccount={this.createAccount}
        />
        <small className="form-text text-muted">
          {this.state.registerSuccess ? (
            <p className="text-success">
              Account created, please register with Stripe now.
            </p>
          ) : (
            'After account has been created please set up account with stripe.'
          )}
        </small>
      </div>
    );
  }
}
export default Register;
