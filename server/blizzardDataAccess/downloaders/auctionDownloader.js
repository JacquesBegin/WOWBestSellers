const request = require("request");
const fs = require("fs");

require('dotenv').config();


// Import all auctions for a specific auction house dump.
importAHDataFromBlizzard = (db, dump) => {
  let promise = new Promise((resolve, reject) => {

    // Possibly add property to record how long the 
    // download takes.

  var filename = `${__dirname}/../ahData/AHData_${Date.now()}.json`;

  request.get(dump.url)
    .on('response', function(res) {
      console.log("res.statusCode: ", res.statusCode);
      console.log("res.headers: ", res.headers['content-type']);
    })
    .on('error', function(err) {
      console.log("Error requesting auction house data: ", err);
      reject(err);
    })
    .on('end', function() {
      console.log("Auction file created.");
      // Once the stream has ended, resolve with auction
      // dump data.
      resolve({
        db: db,
        dumpId: dump.id,
        filename: filename
      });
      // addAuctionsToDB(db, dump.id, filename);
    })
    .pipe(fs.createWriteStream(filename))
  });
  return promise;
}

// Extract data to use for inserting auctions and add 
// auctions to the database from a json file.
addAuctionsToDB = (db, dumpId, file) => {
  let promise = new Promise((resolve, reject) => {
    const jsonData = require(file);
    const auctions = jsonData.auctions;
    const auctionCount = 0;
    const auctionLength = auctions.length;

    insertAuctions(db, dumpId, auctions, auctionCount, 
      auctionLength, {resolve: resolve, reject: reject});
  });
  return promise;
}

insertAuctions = (db, dumpId, auctions, auctionCount, auctionLength, resolution) => {
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
        auctionCount++;
        // Using process.nextTick() causes the next 
        // insertAuctions call to be called after the 
        // current "tick"/loop in the node event loop.
        // Using process.nextTick() locks the application
        // causing any I/O process to wait until after 
        // the last process.nextTick() is finished.
        process.nextTick(() => {insertAuctions(db, dumpId, auctions, auctionCount, auctionLength)});
      })
      .catch((err) => {
        console.log("Error during auction INSERT: ", err);
        resolution.reject(err);
      });
    // });
    // return promise;
  } else {
    console.log(`Auctions from dump ${dumpId} INSERTed`);
    resolution.resolve(true);
  }
}

runAuctionDownloader = (db, dump) => {
  let promise = new Promise((resolve, reject) => {
    importAHDataFromBlizzard(db, dump)
    .then((result) => {
      addAuctionsToDB(result.db, result.dumpId, result.filename);
    })
    .then((result) => {
      console.log(`Done adding auctions: ###${result}###`);
      resolve(true);
    })
    .catch((err) => {
      console.log("Error running auction downloader: ", err);
      reject(err);
    })
  });
  return promise;
}


module.exports = {
  importAHDataFromBlizzard: importAHDataFromBlizzard,
  runAuctionDownloader: runAuctionDownloader
}
// addAuctionsToDB("db", 1111111, "fakeFile");




