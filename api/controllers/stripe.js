const { sendUserError } = require('../helpers');
const firebase = require('firebase');
const axios = require('axios');
const querystring = require('querystring');
const stripe = require('stripe')('sk_test_QSuOZ8Dn5wvjxbtPtyxMTsCS');

const db = firebase.database();

const createAccount = (req, res) => {
  const user = req.body;
  // Generate a random string as state to protect from CSRF
  const state = Math.random()
    .toString(36)
    .slice(2);

  // store the state in the db
  db
    .ref()
    .child('users/' + user.userID)
    .update({ state });

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
  // res.redirect(
  //   'https://connect.stripe.com/express/oauth/authorize' +
  //     '?' +
  //     querystring.stringify(parameters)
  // );
  res.json({
    uri:
      'https://connect.stripe.com/express/oauth/authorize' +
      '?' +
      querystring.stringify(parameters)
  });
};

const connectAccount = (req, res) => {
  // TODO: check state is the same
  const code = req.query.code;
  const grant_type = 'authorization_code';
  const client_id = 'ca_CPnVNqJ6MzKkU0f8rqkxGz44HjAIBxdx';
  const client_secret = 'sk_test_QSuOZ8Dn5wvjxbtPtyxMTsCS';
  const data = { code, client_id, client_secret, grant_type };
  getUID()
    .then(user => {
      axios
        .post('https://connect.stripe.com/oauth/token', data)
        .then(data => {
          const stripe_user_id = data.data.stripe_user_id;
          setUserStripeId(user.uid, stripe_user_id);
          res.redirect(`http://localhost:3000/#/dashboard/${user.uid}`);
        })
        .catch(err => {
          res.json({ err: err, from: 'error in connecting account to stripe' });
        });
    })
    .catch(err => {
      res.json({ err: err, from: 'error in connecting account to stripe' });
    });
};

const createCharge = (req, res) => {
  const { token, owners, amount } = req.body;
  if (!token || !owners || !amount)
    return sendUserError('Donation Failed, please try again');

  const destinations = getUsersStripeAcct(owners);
  const fees = chargeFee(amount);
  destinations
    .then(allUsers => {
      // creates charge for x amount
      stripe.charges
        .create({
          amount: fees.initalTotal,
          currency: 'usd',
          description: 'Example charge',
          source: 'tok_visa',
          transfer_group: token
        })
        .then(charge => {
          // Create a Transfer to the connected account (later):
          stripe.transfers
            .create({
              amount: fees.half,
              currency: 'usd',
              destination: 'acct_1C2koFHQhacaYWQ7',
              transfer_group: token
            })
            .then(function(transfer) {
              // asynchronously called
              stripe.transfers
                .create({
                  amount: fees.half,
                  currency: 'usd',
                  destination: 'acct_1C2kNtDWFjwenLY2',
                  transfer_group: token
                })
                .then(function(secondTransfer) {
                  // asynchronously called
                  res.json({ success: true });
                });
            });
        })
        .catch(err => {
          sendUserError('Failed Transfering', res);
        });
    })
    .catch(err => {
      sendUserError('Could not complete donation', res);
    });
};

const getUID = () => {
  return new Promise((resolve, reject) => {
    db
      .ref('currentUID/secret')
      .once('value')
      .then(snapshot => {
        // uid = snapshot.val().uid;
        resolve(snapshot.val());
      })
      .catch(err => {
        reject({ msg: 'failed to get uid' });
      });
  });
};

const setUserStripeId = (uid, stripe_user_id) => {
  return db
    .ref()
    .child('users/' + uid)
    .update({ stripe_user_id });
};

const getUsersStripeAcct = owners => {
  const stripeAccts = [];
  return new Promise((resolve, reject) => {
    db
      .ref('users')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        owners.forEach(owner => {
          if (data.hasOwnProperty(owner)) {
            stripeAccts.push(data[owner].stripe_user_id);
          } else {
            reject({ msg: 'could not get all user accts' });
          }
        });
        resolve({ data: stripeAccts });
      })
      .catch(err => {
        reject({ msg: 'failed to get accounts' });
      });
  });
};

const chargeFee = amount => {
  const initalTotal = Math.floor(parseInt(amount, 10)) * 100;
  const fee = initalTotal * 0.05;
  const total = initalTotal - fee;
  const half = Math.floor(total / 2);
  return { fee, total, half, initalTotal };
};

const test = (req, res) => {
  db
    .ref('users')
    .once('value')
    .then(snapshot => {
      // resolve(snapshot.val());
      res.json({ success: true, data: snapshot.val() });
    })
    .catch(err => {
      res.json({ success: false });
    });
};

module.exports = { createAccount, connectAccount, createCharge, test };
