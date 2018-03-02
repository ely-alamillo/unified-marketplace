const express = require('express');
const fundraiser = require('../controllers/fundraiser');

const routes = server => {
  const api = express.Router();
  /**
   * Register Route
   */
  api.route('/register').post(fundraiser.register);

  server.use('/api', api);
};

module.exports = { routes };
