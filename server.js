const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/price-logger.html');
});

app.listen(3010, () => {});

//Connection URL
url =
  'mongodb+srv://user_1:xT2atnoDEHj66peU@cluster0-uupiu.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  client.close();
});
