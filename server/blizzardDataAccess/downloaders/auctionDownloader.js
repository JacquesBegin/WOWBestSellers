const request = require("request");
const fs = require("fs");

require('dotenv').config();

/* TODO: Make object for retrieved data with properties for:
url: url of json data, lastModified: time of last AH data
update, processTime: time it took to download the json
data, ahData: json data of ah records
*/

// the phrase "ah" is used to refer to auction house


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
        
        db.query('SELECT EXISTS (SELECT true FROM ahdump WHERE lastmodified = $1)', [ahDownloadData.lastModified], (err, res) => {
          if (err) {
            console.log(err);
          }
          // this if statement may not be checking the correct info
          // may be res.xxxxxxx
          if (!res) {
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
          } else {
            console.log("current ahdump already in database");
          }

        })

        
      }
    }
  );
};

// setInterval(() => {
//   console.log("time running");
// }, 1500);

// retrieveAHData(url);



const bossURL = `https://us.api.battle.net/wow/boss/23863?locale=en_US&apikey=78g9wcthpzzrahr6kjmmu3s79233th2u`;


retrieveBossEncounter = (bossURL) => {
  request(
    {
      url: bossURL,
      json: true
    }, function (err, res, body) {
      if (!err & res.statusCode === 200) {
        // console.log("BODY-Encounter Data: ", body);

        // Check if boss already exists in database
        var newExistsQuery = {};
        newExistsQuery.queryText = 'SELECT EXISTS (SELECT true FROM bossencounter WHERE bossid = $1);';
        newExistsQuery.queryValues = [body.id];
        newExistsQuery.queryCallback = function(err, result) {
          if (!result.rows[0].exists) {

            // If boss does not exist in db then insert it
            var newInsertQuery = {};
            newInsertQuery.queryText = 'INSERT INTO bossencounter(bossid, name, description) VALUES($1, $2, $3);';
            newInsertQuery.queryValues = [body.id, body.name, body.description];
            newInsertQuery.queryCallback = function(err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log("Insert passed");
              }
            };

            db.makeClientQuery(newInsertQuery);

          } else {
            console.log("Boss already in db");
          } 
        }

        db.makeClientQuery(newExistsQuery);
      }
    }
  );
}

retrieveBossEncounter(bossURL);
