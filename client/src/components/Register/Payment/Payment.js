import React, { Component } from 'react';

const Payment = props => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => alert('clicked')}
      disabled={props.disabled}
    >
      Set up Account with Stripe
    </button>
  );
};
export default Payment;
