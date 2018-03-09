const firebase = require('firebase');
const { sendUserError } = require('../helpers');

const config = {
  apiKey: 'AIzaSyCBd6XeDnulYm48tGI9_YIyCQ8hkhsDPvc',
  authDomain: 'fundraising-2e7d0.firebaseapp.com',
  databaseURL: 'https://fundraising-2e7d0.firebaseio.com',
  projectId: 'fundraising-2e7d0',
  storageBucket: 'fundraising-2e7d0.appspot.com',
  messagingSenderId: '738871990838'
};

firebase.initializeApp(config);
const db = firebase.database();

const register = (req, res) => {
  const { firstname, lastname, email, password, fundraiser } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return sendUserError('Please provide all information', res);
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      db.ref('users/' + user.uid).set({
        firstname,
        lastname,
        email,
        uid: user.uid,
        fundraisers: { owner: user.uid, name: fundraiser, total: 0 }
      });
      db.ref('currentUID/secret/').set({
        uid: user.uid
      });
      const newFund = {};
      const fundKey = db
        .ref('fundraisers/')
        .child('fundraisers')
        .push().key;
      newFund['fundraisers/' + fundKey] = {
        owner: user.uid,
        name: fundraiser,
        total: 0
      };
      db.ref().update(newFund);
      res.json({ id: user.uid, email: user.email, success: true });
    })
    .catch(err => {
      return res.json({ errorCode: err.code, message: err.message });
    });
};

const showUserFundraisers = (req, res) => {
  const { uid } = req.body;
  db
    .ref('users/' + uid)
    .once('value')
    .then(snapshot => {
      res.json({ success: true, data: snapshot.val() });
    })
    .catch(err => {
      sendUserError('Error Fetching Fundraisers', res);
    });
};

const showAllFundraisers = (req, res) => {
  db
    .ref('fundraisers/')
    .once('value')
    .then(snapshot => {
      const data = turnToArr(snapshot.val());
      res.json({ success: true, data });
    })
    .catch(err => {
      sendUserError('Error fetching all fundraisers', res);
    });
};

const turnToArr = data => {
  const values = Object.values(data);
  return values;
};

module.exports = {
  register,
  showUserFundraisers,
  showAllFundraisers
};
