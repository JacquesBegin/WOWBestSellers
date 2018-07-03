const request = require("request");
const db = require("../db/dbConnection");
const dbQueries = require("../db/queries");

require('dotenv').config();


// Requests item data from Blizzard 
importItemDataFromBlizzard = (itemId, callback) => {
  let testItemId = 18803;
  let itemUrl = `https://us.api.battle.net/wow/item/${itemId}?locale=en_US&apikey=78g9wcthpzzrahr6kjmmu3s79233th2u`;

  request(
    {
      url: itemUrl,
      json: true
    }, function (err, res, data) {
      if (!err & res.statusCode === 200) {
        console.log("Data:", data);

        callback(data);
      } else {
        console.log("Error retrieving item from Blizzard: ", err);
      }
    }
  );
}

addItemToDB = (item) => {
  db.items.create({
    item_id: item.id,
    name: item.name,
    description: item.description,
    icon: item.icon,
    stackable: item.stackable,
    item_bind: item.itemBind,
    buy_price: item.buyPrice,
    sell_price: item.sellPrice,
    is_auctionable: item.isAuctionable
  })
  .then((newItem) => {
    console.log(`Item ${newItem.name} (${newItem.item_id}) added to the database`);
  })
  .catch((err) => {
    console.log("Error during item INSERT: ", err);
  });
}

retrieveItemFromDB = (itemId) => {
  let promise = new Promise((resolve, reject) => {
    db.sequelize.query(dbQueries.getItem(itemId))
    .then((response) => {
      console.log("response:", response);
      if (!response[0].length) {
        console.log("null");
        resolve(false);
      } else {
        console.log("item found");
        resolve(true);
      }
    })
  })
  return promise;
}

// Check the database for an item, if it is not found
// in the database call the blizzard API to download
// the item information and insert it into the database
downloadNewItemToDb = (itemId) => {
  retrieveItemFromDB(itemId)
  .then((result) => {
    if(!result) {
      importItemDataFromBlizzard(itemId, addItemToDB);
    }
  });
}


downloadNewItemToDb(18803);