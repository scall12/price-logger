require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const session = require('express-session');

const searchRouter = require('./routes/search');
const inputRouter = require('./routes/input');

const app = express();

app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

const oidc = new ExpressOIDC({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
  appBaseUrl: process.env.HOST_URL
});

app.use(oidc.router);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(searchRouter);
app.use(inputRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

oidc.on('ready', () => {
  app.listen(3010, () => console.log('Started'));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
