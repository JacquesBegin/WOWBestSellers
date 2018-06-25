const express = require("express");
const router = express.Router();

module.exports = function(db) {

  router.get("/", function(req, res) {
    db.query('SELECT * FROM bossencounter ORDER BY id LIMIT 2 OFFSET 1')
        .then((results) => {
          console.log(results);
          res.send(results[0]);
        })
        .catch((err) => {
          console.error("Error getting auctions. ERROR: ", err);
        });
  });

  return router;
}

