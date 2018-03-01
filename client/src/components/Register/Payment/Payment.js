import React, { Component } from 'react';

const Payment = () => {
  return (
    <button className="btn btn-primary" onClick={() => alert('clicked')}>
      Set up Account with Stripe
    </button>
  );
};
export default Payment;
