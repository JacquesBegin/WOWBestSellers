require('dotenv').config();
const express = require("express");
const path = require("path");
const db = require("./db/dbConnection");
const auctionRoutes = require("./routes/auctionRoutes")(db);

const app = express();
const PORT = 8884;

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "/client/build")));


// attach routes to the express app
app.use("/auctions", auctionRoutes);

app.all("*", function(req, res) {
  // res.send("Wow Best Sellers");
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  // res.sendFile(__dirname + "/../client/build/index.html");
  // res.status(404).send("We are sorry, content not found.");
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