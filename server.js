require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');

const searchRouter = require('./routes/search');
const inputRouter = require('./routes/input');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(searchRouter);
app.use(inputRouter);

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.ejs');
});

app.listen(3010, () => {});
