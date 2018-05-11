const client = require("../client");


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
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

insertAHData = () => {

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

    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      } else {
        client.query(insertStatement, (err, res) => {
          if (err) {
            console.log(err);
          }
          done();
        });
      }
    });

  }

  pool.end(() => {
    console.log("pool has ended");
  });
}

insertAHData();