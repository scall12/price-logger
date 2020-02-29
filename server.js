const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');

const app = express();

// Global Variables
let db;
const uri =
  'mongodb+srv://user_1:xT2atnoDEHj66peU@cluster0-uupiu.mongodb.net/test?retryWrites=true&w=majority';
const results = [];

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/price-logger.html');
});

app.listen(3010, () => {});

connectMongo = MongoClient.connect(uri, (err, client) => {
  assert.equal(null, err);
  db = client.db('price-logger');
});

app.post('/data', (req, res) => {
  connectMongo;
  const { store, item, price, options } = req.body;
  db.collection(store).insertOne({
    item,
    price,
    options
  });
  res.redirect('/');
});

app.post('/search', async (req, res) => {
  connectMongo;
  const collections = await db.listCollections().toArray();

  for (let result of results) {
    results.pop();
  }

  for (let coll of collections) {
    let cursor = await db
      .collection(coll.name)
      .find({ item: req.body.item })
      .toArray();
    cursor[0].collection = coll.name;
    results.push(...cursor);
  }
  await fs.writeFile('results.json', JSON.stringify(results), err => {
    if (err) {
      throw new Error(err);
    }
    console.log('File has been created');
  });
});

app.get('/search/results.json', (req, res) => {
  res.sendFile(__dirname + '/results.json');
});
