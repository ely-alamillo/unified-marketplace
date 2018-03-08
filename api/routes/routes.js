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

  /**
   * Shows all of a users fundraisers
   */
  api.route('/getuserfundraisers').post(fundraiser.showUserFundraisers);

  /**
   * Shows all fundraisers
   */
  api.route('/getallfundraisers').get(fundraiser.showAllFundraisers);

  /**
   *
   * charges donation
   */
  api.route('/donate').post(stripe.createCharge);

  /**
   * tells our server to have routes
   * under '/api'
   */
  server.use('/api', api);
};

module.exports = { routes };
