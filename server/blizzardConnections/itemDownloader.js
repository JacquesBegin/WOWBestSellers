const request = require("request");
const db = require("../db/dbConnection");
const dbQueries = require("../db/queries");

require('dotenv').config();


const itemUrl = `https://us.api.battle.net/wow/item/18803?locale=en_US&apikey=78g9wcthpzzrahr6kjmmu3s79233th2u`;

createItemsTable = () => {
  db.query(dbQueries.createItemsTable());
}

retrieveItemDataFromDB = (itemId) => {
  db.query(dbQueries.createItemsTable())
    .then(db.query(dbQueries.getItem(itemId)))
    .then((response) => {
      console.log("response:", response);
      if (response === null) {
        console.log("null");
      }
    })
}



createItemsTable();
retrieveItemDataFromDB(1);