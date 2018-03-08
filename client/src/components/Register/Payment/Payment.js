import React from 'react';

const Payment = props => {
  return (
    <button
      className="btn btn-primary"
      onClick={props.createAccount}
      disabled={props.disabled}
    >
      Set up Account with Stripe
    </button>
  );
};
export default Payment;
