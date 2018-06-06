const express = require("express");


const app = express();
const PORT = 8883;

startAppServer = () => {
  var server = app.listen(process.env.PORT || PORT, () => {
    var port = server.address().port;
    console.log(`App server running on port ${port}`);
  });
}

startAppServer();