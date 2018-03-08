import React, { Component } from 'react';
import Fundaraisers from './Fundraisers/Fundraisers';
import axios from 'axios';

class Dashboard extends Component {
  state = {
    fundraisers: null
  };
  componentDidMount() {
    this.getFundraisers();
  }

  getFundraisers = () => {
    const uid = window.localStorage.getItem('uid');
    axios
      .post('http://localhost:8080/api/getuserfundraisers', { uid })
      .then(data => {
        const { name, owner, total } = data.data.data.fundraisers;
        const fundraisers = [{ name, owner, total }];
        this.setState({ fundraisers });
      })
      .catch(err => {
        console.log('getFundraisers error', err);
      });
  };

  render() {
    return (
      <div>
        <h1>This is the Dashboard </h1>
        <Fundaraisers fundraisers={this.state.fundraisers} />
      </div>
    );
  }
}
export default Dashboard;
