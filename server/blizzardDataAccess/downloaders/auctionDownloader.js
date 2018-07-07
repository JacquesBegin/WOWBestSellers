const request = require("request");
const fs = require("fs");

require('dotenv').config();


// Import all auctions for a specific auction house dump.
importAHDataFromBlizzard = (db, dump) => {

  var url = "http://auction-api-us.worldofwarcraft.com/auction-data/de55febb04096123926bca84d7b31f1c/auctions.json"

  // Potentially add property to record how long the 
  // download takes.

  // request(
  //   {
  //     url: dump.url,
  //     json: true
  //   }, function (err, res, data) {
  //     if (!err & res.statusCode === 200) {
        
  //       // var filename = `${__dirname}/../ahData/AHData_${Date.now()}.json`;

  //       ahDownloadData.ahData = data;
  //       ahDownloadData.filename = filename;

  //       var currentAHData = JSON.stringify(ahDownloadData);
        
  //       console.log("passed loading");
  //       fs.writeFile(filename, currentAHData, (err) => {
  //         if (err) {
  //           console.log(`err: ${err}`);
  //         } else {
  //           console.log(`File ${filename} saved`);
  //         }
  //       });
  //     }
  //   }
  // );

  var filename = `${__dirname}/../ahData/AHData_${Date.now()}.json`;

  // request.get(dump.url)
  request.get(url)
    .on('response', function(res) {
      console.log("res.statusCode: ", res.statusCode);
      console.log("res.headers: ", res.headers['content-type']);
    })
    .on('error', function(err) {
      console.log("Error requesting auction house data: ", err);
    })
    .on('end', function() {
      console.log("Auction file created.");
      // Once the stream has ended, add auctions to DB
      addAuctionsToDB(db, dump.id, filename);
    })
    .pipe(fs.createWriteStream(filename))
}

// Add auctions to the database from a json file
addAuctionsToDB = async (db, dumpId, file) => {

  const tempDB = require("../../db/config/index.js");

  // const jsonData = require(file);
  const jsonData = require("../ahData/AHData_1530834639900.json");
  console.log("jsonData.realms: ", jsonData.realms);
  const auctions = jsonData.auctions;
  const auctionCount = 0;
  const auctionLength = auctions.length;

  console.log("auction: ", auctions[0]);

  // for(let auc of auctions) {
  //   await insertAuction(tempDB, dumpId, auc);
  // }

  // auctions.map((auc) => {
  //   insertAuction(tempDB, dumpId, auc);
  //   return null;
  // })

  insertAuction(tempDB, dumpId, auctions, auctionCount, auctionLength);

  // let auction = auctions[0];
  // auctions.forEach(function(auction) {
  // for(let auction in auctions) {
    // tempDB.auctions.create({
  //   db.auctions.create({
  //     dump_id: dumpId,
  //     auction_id: auction.auc,
  //     item_id: auction.item,
  //     owner: auction.owner,
  //     owner_realm: auction.ownerRealm,
  //     bid: auction.bid,
  //     buyout: auction.buyout,
  //     quantity: auction.quantity,
  //     time_left: auction.timeLeft,
  //     rand: auction.rand,
  //     seed: auction.seed,
  //     context: auction.context,
  //     pet_species_id: auction.petSpeciesId || null,
  //     pet_breed_id: auction.petBreedId || null,
  //     pet_level: auction.petLevel || null,
  //     pet_quality_id: auction.petQualityId || null
  //   })
  //   .then((auction) => {
  //   })
  //   .catch((err) => {
  //     console.log("Error during auction INSERT: ", err);
  //   });
  // });
}

insertAuction = (db, dumpId, auctions, auctionCount, auctionLength) => {
  if (auctionCount < auctionLength) {
    let auction = auctions[auctionCount];
    // let promise = new Promise((resolve, reject) => {
      db.auctions.create({
        dump_id: dumpId,
        auction_id: auction.auc,
        item_id: auction.item,
        owner: auction.owner,
        owner_realm: auction.ownerRealm,
        bid: auction.bid,
        buyout: auction.buyout,
        quantity: auction.quantity,
        time_left: auction.timeLeft,
        rand: auction.rand,
        seed: auction.seed,
        context: auction.context,
        pet_species_id: auction.petSpeciesId || null,
        pet_breed_id: auction.petBreedId || null,
        pet_level: auction.petLevel || null,
        pet_quality_id: auction.petQualityId || null
      })
      .then((result) => {
        console.log("INSERT successful: ", auctionCount);
        auctionCount++;
        // Using process.nextTick() causes the next 
        // insertAuction call to be called after the 
        // current "tick"/loop in the node event loop.
        // Using process.nextTick() locks the application
        // causing any I/O process to wait until after 
        // the last process.nextTick() is finished.
        process.nextTick(() => {insertAuction(db, dumpId, auctions, auctionCount, auctionLength)});
      })
      .catch((err) => {
        console.log("Error during auction INSERT: ", err);
      });
    // });
    // return promise;
    
  }
}


// module.exports = importAHDataFromBlizzard;

addAuctionsToDB("db", 1111111, "fakeFile");




