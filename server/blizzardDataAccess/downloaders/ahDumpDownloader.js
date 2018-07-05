const request = require("request");

require('dotenv').config();

// url to Blizzard API for Thrall server ah information 
const url = `https://us.api.battle.net/wow/auction/data/thrall?locale=en_US&apikey=${process.env.API_KEY}`;

// url to Blizzard API for Alterac Mountains server ah information 
// const url = `https://us.api.battle.net/wow/auction/data/alterac%20mountains?locale=en_US&apikey=${process.env.API_KEY}`;

importAhDumpData = () => {
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

        ahDownloadData.url = body.files[0].url;
        ahDownloadData.lastModified = body.files[0].lastModified;
        
      }
    }
  );
}
  