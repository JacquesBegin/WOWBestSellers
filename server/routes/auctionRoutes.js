const express = require("express");
const router = express.Router();

module.exports = function(db) {

  router.get("/all/:position", function(req, res) {
    let startingId = (req.params.position === 0) ? 1255411726 : req.params.position;
    if (req.params.position === 0) {

    }

    db.sequelize.query(`SELECT * FROM ahrecord ORDER BY auctionid LIMIT 20`, {
      raw: true
    })
      .then((results) => {
        console.log(results[0]);
        res.json(results[0]);
      })
      .catch((err) => {
        console.error("Error getting auctions. ERROR: ", err);
      })
  });

  router.get("/bosses", function(req, res) {
    db.sequelize.query('SELECT * FROM bossencounter ORDER BY id LIMIT 2 OFFSET 1', {
      raw: true
    })
      .then((results) => {
        console.log(results[0]);
        res.json(results[0]);
      })
      .catch((err) => {
        console.error("Error getting bosses. ERROR: ", err);
      });
  });

  router.get("/test", function(req, res) {
    res.send({test: "Test Route"});
  });

  return router;
}

