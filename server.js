require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.ejs');
});

app.listen(3010, () => {});

app.post('/data', async (req, res) => {
  await MongoClient.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
    (err, client) => {
      assert.equal(null, err);
      db = client.db('test');

      const { item, store, price, options } = req.body;
      db.collection('price-logger').insertOne({
        item,
        store,
        price,
        options
      });
      res.redirect('/');

      client.close();
    }
  );
});

app.post('/', async (req, res) => {
  await MongoClient.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
    async (err, client) => {
      assert.equal(null, err);
      const db = client.db('test');

      let cursor = await db
        .collection('price-logger')
        .find({ item: req.body.item })
        .toArray();

      res.render('index', {
        cursor
      });
      client.close();
    }
  );
});

app.get('/search/results.json', (req, res) => {
  res.sendFile(__dirname + '/results.json');
});
