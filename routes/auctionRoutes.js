const express = require("express");
const router = express.Router();
const db = require("../db/dbConnection");

router.get("/", function(req, res) {
  db.query('SELECT * FROM bossencounter')
      .then((results) => {
        console.log(results);
        res.send(results[0]);
      })
      .catch((err) => {
        console.error("Error getting auctions. ERROR: ", err);
      });
});

module.exports = router;