require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const oidc = require('./okta');
const searchRouter = require('./routes/search');
const inputRouter = require('./routes/input');
const dataRouter = require('./routes/view-all');

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store
  })
);

app.use(oidc.router);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(searchRouter);
app.use(inputRouter);
app.use(dataRouter);

app.get('/', (req, res) => {
  res.render('index.ejs');
  // if (req.userContext) {
  //   console.log(req.userContext.userinfo.sub);
  // }
});

oidc.on('ready', () => {
  app.listen(3010, () => console.log('Started'));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
