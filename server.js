const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const { routes } = require('./api/routes/routes');
const server = express();

// enable session
server.use(
  session({
    secret: 'thisIsTheSecretForNow',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore()
  })
);

mongoose.Promise = global.Promise;

const corsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true // enable set cookie
};

// static server
server.use(express.static(path.join(__dirname, 'client/build')));

// body parser used to process form data
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// cors options to allow access from other endpoints
server.use(cors(corsOptions));

// wires up routes
routes(server);

server.listen(process.env.PORT || 8080, err => {
  if (err) console.log('Error Starting the server');
  console.log(`server listening on port ${process.env.PORT || 8080}`);
});

module.exports = { server };
