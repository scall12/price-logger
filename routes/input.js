const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const router = express.Router();

router.post('/data', async (req, res) => {
  await MongoClient.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
    async (err, client) => {
      assert.equal(null, err);
      const db = client.db('test');

      const { item, store, price, options } = req.body;
      await db.collection('price-logger').insertOne({
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

module.exports = router;
