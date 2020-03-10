const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const router = express.Router();

router.post('/', async (req, res) => {
  await MongoClient.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
    async (err, client) => {
      assert.equal(null, err);
      const db = client.db('test');

      let cursor = await db
        .collection('adjust-pricing')
        .find({ item: req.body.item })
        .toArray();

      res.render('index', {
        cursor
      });
      client.close();
    }
  );
});

module.exports = router;
