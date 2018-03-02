const { sendUserError } = require('../helpers');
const querystring = require('querystring');

const createAccount = (req, res) => {
  const user = req.body;
  console.log('user:', req.body);
  // Generate a random string as state to protect from CSRF
  const state = Math.random()
    .toString(36)
    .slice(2);
  // Prepare the mandatory Stripe parameters.
  let parameters = {
    client_id: 'ca_CPnVNqJ6MzKkU0f8rqkxGz44HjAIBxdx',
    state
  };
  // Optionally, Stripe Connect accepts `first_name`, `last_name`, `email`,
  // and `phone` in the query parameters for them to be autofilled.
  parameters = Object.assign(parameters, {
    'stripe_user[business_type]': 'individual',
    'stripe_user[first_name]': user.firstname || undefined,
    'stripe_user[last_name]': user.lastname || undefined,
    'stripe_user[email]': user.email,
    'stripe_user[business_name]': user.businessName || undefined
  });
  // Redirect to Stripe to start the Connect onboarding.
  res.redirect(
    // 'https://connect.stripe.com/express/oauth/authorize' +
    //   '?' +
    //   querystring.stringify(parameters)
    'https://connect.stripe.com/express/oauth/authorize?client_id=ca_CPnVNqJ6MzKkU0f8rqkxGz44HjAIBxdx&state=asdfgeh'
  );
};

module.exports = { createAccount };
