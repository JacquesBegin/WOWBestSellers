const request = require("request");
const auctionDownloader = require("./auctionDownloader");

require('dotenv').config();

// url to Blizzard API for Thrall server ah information 
const url = `https://us.api.battle.net/wow/auction/data/thrall?locale=en_US&apikey=${process.env.API_KEY}`;

// url to Blizzard API for Alterac Mountains server ah information 
// const url = `https://us.api.battle.net/wow/auction/data/alterac%20mountains?locale=en_US&apikey=${process.env.API_KEY}`;

importAhDumpData = (db) => {
  request(
    {
      url: url,
      json: true
    }, function (err, res, data) {
      if (!err && res.statusCode === 200) {
        console.log("firstbody:", data);

        let ahDump = {};
        ahDump.url = data.files[0].url;
        ahDump.lastModified = data.files[0].lastModified;

        checkIfDumpInDB(db, data.files[0].lastModified)
          .then((result) => {
            if (!result) {
              addDumpToDB(db, ahDump)
                .then((result) => {
                  // Call auctionDownloader to import all
                  // auctions from current dump.
                })
                .catch((err) => {
                  console.log("Dump not added to database: ", err);
                })
            }
          })
      } else {
        console.log("Error importing dump: ", err);
      }
    }
  );
}

checkIfDumpInDB = (db, lastModified) => {
  let promise = new Promise((resolve, reject) => {
    db.dumps.findOne({
      where: {
        last_modified: lastModified
      }
    })
    .then((dump) => {
      if (dump) {
        console.log("Dump in database.");
        resolve(true);
      } else {
        console.log("Dump not in database.");
        resolve(false);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
  return promise;
}

addDumpToDB = (db, dump) => {
  // Create a promise here and return it.
  // The following .then should call the auction
  // downloader and start the process of importing
  // all auctions from the current dump.
  let promise = new Promise((resolve, reject) => {
    db.dumps.create({
      url: dump.url,
      last_modified: dump.lastModified
    })
    .then((newDump) => {
      console.log(`Dump ${newDump.last_modified} (ID: ${newDump.id}) added to the database.`);
    })
    .catch((err) => {
      console.log("Error during dump INSERT: ", err);
    });
    resolve();
  })
  return promise;
}
 

module.exports = importAhDumpData;