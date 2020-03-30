const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const oidc = require('../okta');
const router = express.Router();

router.post('/search', oidc.ensureAuthenticated(), async (req, res) => {
  await MongoClient.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
    async (err, client) => {
      assert.equal(null, err);
      const db = client.db('test');

      const arr = req.body.item.trim().split(/; */gi);

      const user = req.session.passport.user.userinfo.sub;
      const cursor = await db
        .collection('test')
        .find({
          user
        })
        .toArray();

      const filteredCursor = cursor.filter(obj => {
        return arr.includes(obj.item);
      });

      res.render('index', {
        cursor: filteredCursor
      });
      // res.send(filteredCursor);
      client.close();
    }
  );
});

module.exports = router;
