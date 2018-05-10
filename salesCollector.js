const request = require("request");
const fs = require("fs");

require('dotenv').config();

/* TODO: Make object for retrieved data with properties for:
url: url of json data, lastModified: time of last AH data
update, processTime: time it took to download the json
data, ahData: json data of ah records
*/

// the phrase "ah" is used to refer to auction house

// url to Blizzard API for Thrall server ah information 
var url = `https://us.api.battle.net/wow/auction/data/thrall?locale=en_US&apikey=${process.env.API_KEY}`;

// url to Blizzard API for Alterac Mountains server ah information 
// var url = `https://us.api.battle.net/wow/auction/data/alterac%20mountains?locale=en_US&apikey=${process.env.API_KEY}`;


retrieveAHData = (serverUrl) => {

  // Object to hold data related to ah download data
  var ahDownloadData = {};

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
  
        var downloadStartTime = Date.now();
  
        request(
          {
            url: ahDownloadData.url,
            json: true
          }, function (err, res, data) {
            if (!err & res.statusCode === 200) {
              
              var downloadEndTime = Date.now();
              var downloadElapsedTimeMilliseconds = downloadEndTime - downloadStartTime;
              var filename = `${__dirname}/ahData/AHData_${Date.now()}.json`;
  
              ahDownloadData.downloadElapsedTimeMilliseconds = downloadElapsedTimeMilliseconds;
              ahDownloadData.ahData = data;
              ahDownloadData.createDate = downloadStartTime;
              ahDownloadData.filename = filename;
  
              var currentAHData = JSON.stringify(ahDownloadData);
              
              console.log("passed loading");
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
};

retrieveAHData(url);

// setInterval(() => {
//   console.log("time running");
// }, 1500);

