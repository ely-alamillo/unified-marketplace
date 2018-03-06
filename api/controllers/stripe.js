const { sendUserError } = require('../helpers');
const firebase = require('firebase');
const axios = require('axios');
const querystring = require('querystring');

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
  // const uid = await getUID();
  // console.log('UID from connectAccount: ', uid);
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
      console.log(error);
      res.json({ err: err, from: 'error in connecting account to stripe' });
    });

  // if (uid === 'ERORR') {
  //   res.json({ error: 'could not get uid' });
  // } else {
  //   axios
  //     .post('https://connect.stripe.com/oauth/token', data)
  //     .then(data => {
  //       const stripe_user_id = data.data.stripe_user_id;
  //       setUserStripeId(uid, stripe_user_id);
  //       res.redirect('http://localhost:3000/#/yeetboy');
  //     })
  //     .catch(err => {
  //       res.json({ err: err, from: 'error in connecting account to stripe' });
  //     });
  // }
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

  // })
  let uid = '';
  db
    .ref('currentUID/secret')
    .once('value')
    .then(snapshot => {
      uid = snapshot.val().uid;
    })
    .catch(err => {
      uid = 'ERORR';
    });
  return uid;
};

const setUserStripeId = (uid, stripe_user_id) => {
  console.log('UID: ', uid);
  return db
    .ref()
    .child('users/' + uid)
    .update({ stripe_user_id });
};

const test = (req, res) => {
  let uid = '';
  db
    .ref('currentUID/secret')
    .once('value')
    .then(snapshot => {
      uid = snapshot.val().uid;
      console.log('uid inside getUID: ', uid);
      console.log('snapshot.value().uid: ', snapshot.val().uid);
      res.json({ success: true });
    })
    .catch(error => {
      console.log('error:', error);
      res.json({ err: true });
    });
  // return uid;
};

module.exports = { createAccount, connectAccount, test };
