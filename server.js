const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

let db;
const uri =
  'mongodb+srv://user_1:xT2atnoDEHj66peU@cluster0-uupiu.mongodb.net/test?retryWrites=true&w=majority';

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/price-logger.html');
});

app.listen(3010, () => {});

const connectMongo = MongoClient.connect(uri, (err, client) => {
  assert.equal(null, err);
  db = client.db('price-logger');
});

app.post('/data', (req, res) => {
  connectMongo;
  const { store, item, price, options } = req.body;
  db.collection(store)
    .insertOne({
      item,
      price,
      options
    })
    .then(result => {
      client.close();
    });

  res.redirect('/');
});
