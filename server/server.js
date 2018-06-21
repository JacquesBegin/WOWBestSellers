require('dotenv').config();
const express = require("express");
const auctionRoutes = require("../routes/auctionRoutes");
const db = require("../db/dbConnection");

const app = express();
const PORT = 8883;


// attach routes to the express app
app.use("/auctions", auctionRoutes);

app.get("/", function(req, res) {
  res.send("Wow Best Sellers");
});


db.authenticate()
  .then(() => {
    console.log("Connected to the database.");
    startAppServer();
  })
  .catch(err => {
    console.error("Unable to connect to database: ", err);
  })


startAppServer = () => {
  var server = app.listen(process.env.PORT || PORT, () => {
    var port = server.address().port;
    console.log(`App server running on port ${port}`);
  });
}