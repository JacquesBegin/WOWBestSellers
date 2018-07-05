require('dotenv').config();
const express = require("express");
const path = require("path");
const db = require("./db/config/index");
const auctionRoutes = require("./routes/auctionRoutes")(db);
const blizzardDownloader = require("./blizzardDataAccess/index")(db);
const itemDownloader = require("./blizzardDataAccess/downloaders/itemDownloader");

const app = express();
const PORT = 8884;

// Serve static files from the React build folder.
app.use(express.static(path.join(__dirname, "/../client/build")));

initializeRoutes = () => {
  // Attach routes to the express app.
  app.use("/auctions", auctionRoutes);

  // Assign the catch all route to send the index.html page.
  app.all("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });  
}

startBlizzardDownloader = (db) => {
  blizzardDownloader(db);
}

startAppServer = () => {
  var server = app.listen(process.env.PORT || PORT, () => {
    var port = server.address().port;
    console.log(`App server running on port ${port}`);
  });
}

// Ensure there is a connection to the database.
db.sequelize.authenticate()
  .then(() => {
    console.log("Connected to the database.");
    initializeRoutes();
    startAppServer();
    // itemDownloader(db, 18807);
  })
  .catch(err => {
    console.error("Unable to connect to database: ", err);
  })