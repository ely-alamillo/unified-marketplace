import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const HomePage = props => {
  return (
    <div className="home-page">
      <div>
        <h1>Simple Funds</h1>
      </div>
      <div>
        <LinkContainer to="/test">
          <button className="btn btn-primary btn-lg mb-3">Login</button>
        </LinkContainer>
      </div>
      <div>
        <LinkContainer to="/start">
          <button className="btn btn-primary btn-lg mb-3">
            Start a Fundraising Campaign
          </button>
        </LinkContainer>
      </div>
      <div>
        <LinkContainer to="/campaigns">
          <button className="btn btn-primary btn-lg mb-3">
            Donate to a Campaign
          </button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default HomePage;
