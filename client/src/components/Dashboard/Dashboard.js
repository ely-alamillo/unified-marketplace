import React, { Component } from 'react';
import Fundaraisers from './Fundraisers/Fundraisers';
const Dashboard = props => {
  console.log(props.match.params);
  return (
    <div>
      <h1>This is the Dashboard </h1>
      <Fundaraisers />
    </div>
  );
};
export default Dashboard;
