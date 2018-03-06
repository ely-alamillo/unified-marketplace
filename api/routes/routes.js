const express = require('express');
const fundraiser = require('../controllers/fundraiser');
const stripe = require('../controllers/stripe');

const routes = server => {
  const api = express.Router();
  /**
   * Register Route
   */
  api.route('/register').post(fundraiser.register);

  /**
   * Stripe Create Account Route
   */
  api.route('/stripe-register').post(stripe.createAccount);

  /**
   * Stripe Connect account
   */
  api.route('/token').get(stripe.connectAccount);

  api.route('/test').get(stripe.test);
  /**
   * tells our server to have routes
   * under '/api'
   */
  server.use('/api', api);
};

module.exports = { routes };
