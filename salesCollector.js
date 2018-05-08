const request = require("request");
const fs = require("fs");

require('dotenv').config();


var url = `https://us.api.battle.net/wow/auction/data/thrall?locale=en_US&apikey=${process.env.API_KEY}`;
// var url = `https://us.api.battle.net/wow/item/18803?locale=en_US&apikey=${process.env.API_KEY}`;

request(
  {
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("firstbody:", body);
      // check body.lastModified with previous request
      // and only pull data if the content has been
      // modified.
      // if (body.lastModified !== XXXXXX.timeStamp)

      request(
        {
          url: body.files[0].url,
          // url: url,
          json: true
        }, function (err, res, data) {
          console.log("secondBody: ", data)
          if (!err & res.statusCode === 200) {
            console.log("passed");
            var currentAHData = JSON.stringify(data);
            var filename = `${__dirname}/ahData/AHData_${Date.now()}.json`;
            fs.writeFile(filename, currentAHData, (err) => {
              if (err) {
                console.log(`err: ${err}`);
              } else {
                console.log(`File ${filename} saved`);
              }
            });
          }
        }
      );
    }
  }
);