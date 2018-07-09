require('dotenv').config();
const express = require("express");
const path = require("path");
const db = require("./db/config/index");
const auctionRoutes = require("./routes/auctionRoutes")(db);
const blizzardDownloader = require("./blizzardDataAccess/index");

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

startBlizzardDownloader = () => {
  // blizzardDownloader.downloadDump(db);
  blizzardDownloader.importNewItems(db);
}

startAppServer = () => {
  var server = app.listen(process.env.PORT || PORT, () => {
    var port = server.address().port;
    console.log(`App server running on port ${port}`);
    startBlizzardDownloader();
  });
}

// Ensure there is a connection to the database.
db.sequelize.authenticate()
  .then(() => {
    console.log("Connected to the database.");
    initializeRoutes();
    startAppServer();
  })
  .catch(err => {
    console.error("Unable to connect to database: ", err);
  })