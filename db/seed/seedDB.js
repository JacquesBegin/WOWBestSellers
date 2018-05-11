const cpConfig = require("../clientAndPoolConfig");
require('dotenv').config();

// use this function call to drop current tables and recreate
// this will delete any data currently stored in the db
createTables = () => {
  const seedDatabase = require("./createTables");
  seedDatabase.createTables(cpConfig.client);
}
// createTables();



// used to test retrieving api data and inserting to db
insertToRecipeTable = () => {
  const seedRecipeTable = require("./insertRecipe");
  seedRecipeTable.insertRecipeToDB(cpConfig.client);
}
// insertRecipeToDB();


// test to seed database with ah data
insertToAHRecordTable = () => {
  const ahData = require("../../ahData/AHData_1525812207294.json");
  const insertToAHRecord = require("./insertAHData");
  const ahClient = cpConfig.client;

  ahClient.connect((err) => {
    if (err) {
      console.log("connection error: ", err);
    } else {
      console.log("client connected");
      insertToAHRecord.insertAHRecordToDB(ahClient, ahData, (ahc) => {
        ahc.end((err) => {
          console.log("client has disconnected");
          if (err) {
            console.log("error occured during disconnect");
          }
        });
      });
    }
  });
}

// insertToAHRecordTable();

