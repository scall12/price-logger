const express = require('express');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

router.post('/data', async (req, res) => {
  console.log(req);
  await MongoClient.connect(async (err, client) => {
    assert.equal(null, err);
    const db = client.db('test');
    const {
      item,
      store,
      currency,
      price,
      priceWeight,
      priceWeightSelect
    } = req.body;

    db.collection('adjust-pricing').insertOne({
      item,
      store,
      currency,
      price,
      priceWeight,
      priceWeightSelect
    });
    res.redirect('/');

    client.close();
  });
});

module.exports = router;
