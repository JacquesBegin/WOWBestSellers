const express = require("express");
const auctionRoutes = require("../routes/auctionRoutes");
const Sequelize = require("sequelize");

const app = express();
const PORT = 8883;
require('dotenv').config();


const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => {
    console.log("Connected to the database.");
    startAppServer();
  })
  .catch(err => {
    console.error("Unable to connect to database: ", err);
  })


// attach routes to the express app
app.use("/auctions", auctionRoutes);

app.get("/", function(req, res) {
  res.send("Wow Best Sellers");
});


startAppServer = () => {
  var server = app.listen(process.env.PORT || PORT, () => {
    var port = server.address().port;
    console.log(`App server running on port ${port}`);
  });
}