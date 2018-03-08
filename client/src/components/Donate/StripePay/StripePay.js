import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripePay = props => {
  return (
    <StripeCheckout
      token={props.onToken}
      stripeKey="pk_test_lQChvBC3SslCU83lTaDxPst5"
      name="Stripe Shop"
      panelLabel="Donate Now"
      currency="USD"
      email="support@stripeshop.com"
      onClose={() => props.self.setState({ clicked: false })}
    >
      <button
        className="btn btn-primary"
        disabled={props.disabled}
        onClick={() => props.self.setState({ clicked: true })}
      >
        Donate With Stripe
      </button>
    </StripeCheckout>
  );
};

export default StripePay;
