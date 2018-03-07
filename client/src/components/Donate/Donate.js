import React, { Component } from 'react';
import Fundraisers from './Fundraisers/Fundraisers';
import axios from 'axios';

class Donate extends Component {
  state = {
    fundraisers: null,
    error: null
  };
  componentDidMount() {
    this.getAllFundraisers();
  }

  getAllFundraisers = () => {
    axios
      .get('http://localhost:8080/api/getallfundraisers')
      .then(data => {
        console.log(data.data.data);
        this.setState({ fundraisers: data.data.data });
      })
      .catch(err => {
        this.setState({
          error:
            'there was an error fetching fundraisers, please refresh the page'
        });
      });
  };

  render() {
    return (
      <div>
        <h1>This is the donationd page</h1>
        <Fundraisers
          error={this.state.err}
          fundraisers={this.state.fundraisers}
        />
      </div>
    );
  }
}

export default Donate;
