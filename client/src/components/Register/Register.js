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
    error: {
      message: ''
    }
  };

  signUp = () => {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    // firebaseApp
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     console.log('this is the user:', user);
    //     axios
    //       .post('http://localhost:4000/api/register', { username: user.email })
    //       .then(element => {
    //         console.log('element: ', element.data);
    //       })
    //       .catch(err => {
    //         console.log('error saving user: ', err);
    //       });
    //     this.setState({
    //       email: '',
    //       password: ''
    //     });
    //     this.props.history.push('/listen');
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //   });
    this.setState({ disabled: false });
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
        <Payment disabled={this.state.disabled} />
      </div>
    );
  }
}
export default Register;
