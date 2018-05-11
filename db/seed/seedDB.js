const client = require("../client");
require('dotenv').config();

// use this function call to drop current tables and recreate
// this will delete any data currently stored in the db
// const seedDatabase = require("./createTables");
// seedDatabase.createTables(client);


// used to test retrieving api data and inserting to db
// const seedRecipeTable = require("./insertRecipe");
// seedRecipeTable.insertRecipeToDB(client);

// test to seed database with ah data
const ahData = require("../../ahData/AHData_1525812207294.json");
var auctionCount = ahData.auctions.length;
console.log("auctionCount: ", auctionCount);
const { Pool, Client } = require("pg");
// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000
// });
const ahClient = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

ahClient.connect((err) => {
  if (err) {
    console.log("connection error: ", err);
  } else {
    console.log("client connected");
    insertAHData(ahClient, (ahc) => {
      ahc.end((err) => {
        console.log("client has disconnected");
        if (err) {
          console.log("error occured during disconnect");
        }
      })
    });
  }
});

insertAHData = (ahc, callback) => {
  for (var i = 0; i < auctionCount; i++) {
    var insertStatement = `INSERT INTO ahRecord
        (groupId, auctionId, item, owner, ownerRealm,
        bid, buyout, quantity, timeLeft, rand, seed,
        context, petSpeciesId, petBreedId, petLevel,
        petQualityId) VALUES
        (null, ${ahData.auctions[i].auc}, ${ahData.auctions[i].item}, 
        '${ahData.auctions[i].owner || null}', '${ahData.auctions[i].ownerRealm || null}',
        ${ahData.auctions[i].bid || null}, ${ahData.auctions[i].buyout || null}, ${ahData.auctions[i].quantity || null},
        '${ahData.auctions[i].timeLeft || null}', ${ahData.auctions[i].rand || null}, ${ahData.auctions[i].seed || null},
        ${ahData.auctions[i].context || null}, ${ahData.auctions[i].petSpeciesId || null}, 
        ${ahData.auctions[i].petBreedId || null}, ${ahData.auctions[i].petLevel || null}, 
        ${ahData.auctions[i].petQualityId || null});
        `;
    ahc.query(insertStatement, (err, res) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
    if (i === auctionCount - 1) {
      console.log("reached end");
    }
  }
}



