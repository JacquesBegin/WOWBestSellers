require('dotenv').config();
const express = require("express");
const path = require("path");
const db = require("./db/dbConnection");
const auctionRoutes = require("./routes/auctionRoutes")(db);

const app = express();
const PORT = 8884;

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "/../client/build")));


// Attach routes to the express app
app.use("/auctions", auctionRoutes);


// Assign the catch all route to send the index.html page
app.all("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
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