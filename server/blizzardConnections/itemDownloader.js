const request = require("request");
const db = require("../db/dbConnection");
const dbQueries = require("../db/queries");

require('dotenv').config();



createItemsTable = () => {
  db.query(dbQueries.createItemsTable());
}

importItemDataFromBlizzard = (itemId) => {
  let testItemId = 18803;
  let itemUrl = `https://us.api.battle.net/wow/item/${itemId}?locale=en_US&apikey=78g9wcthpzzrahr6kjmmu3s79233th2u`;

  request(
    {
      url: itemUrl,
      json: true
    }, function (err, res, data) {
      if (!err & res.statusCode === 200) {
        console.log(data);
      } else {
        console.log("Error retrieving item from Blizzard: ", err);
      }
    }
  );

}

addItemToDB = (item) => {
  let itemInfo = {};
  itemInfo.itemid = item.itemId;
  itemInfo.name = item.name;
  itemInfo.description = item.description;
  itemInfo.icon = item.icon;
  itemInfo.stackable = item.stackable;
  itemInfo.itembind = item.itemBind;
  itemInfo.buyprice = item.buyPrice;
  itemInfo.sellprice = item.sellPrice;
  itemInfo.isauctionable = item.isAuctionable;

  db.query(dbQueries.addItem(itemInfo))
    .then(() => {
      console.log(`Item ${itemInfo.itemid} added to database successfully`);
    })
    .catch((err) => {
      console.log(`Error adding item ${itemInfo.itemid} to database: ${err}`);
    })
}

retrieveItemDataFromDB = (itemId) => {
  db.query(dbQueries.createItemsTable())
    .then(db.query(dbQueries.getItem(itemId)))
    .then((response) => {
      console.log("response:", response);
      if (!response[0].length) {
        console.log("null");
      } else {
        console.log("item found");
      }
    })
}



createItemsTable();
retrieveItemDataFromDB(1);
importItemDataFromBlizzard(18803);