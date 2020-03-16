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

      const user = req.session.passport.user.userinfo.sub;
      const cursor = await db
        .collection('adjust-pricing')
        .find({
          user,
          'data.item': req.body.item
        })
        .toArray();

      res.render('index', {
        cursor
      });
      client.close();
    }
  );
});

module.exports = router;
