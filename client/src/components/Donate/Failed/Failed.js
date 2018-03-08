import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const Failed = props => {
  return (
    <div>
      <h1 className="text-danger">Donation Failed please try again</h1>
      <LinkContainer to="/donate">
        <button className="btn btn-primary btn-lg mb-3">
          Go back to fundraisers
        </button>
      </LinkContainer>
    </div>
  );
};

export default Failed;
