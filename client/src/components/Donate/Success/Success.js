import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const Success = props => {
  return (
    <div>
      <h1 className="text-success">Thank you for Donating!</h1>
      <LinkContainer to="/donate">
        <button className="btn btn-primary btn-lg mb-3">
          Go back to fundraisers
        </button>
      </LinkContainer>
    </div>
  );
};

export default Success;
