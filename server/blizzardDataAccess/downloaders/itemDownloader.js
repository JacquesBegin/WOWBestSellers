const request = require("request");

require('dotenv').config();

// Purpose of this file:
// Check the database for an item, if it is not found
// in the database call the blizzard API to download
// the item information and insert it into the database.


// Requests item data from Blizzard and takes a callback 
// to handle the returned data.
importItemDataFromBlizzard = (db, itemId, callback) => {
  let itemUrl = `https://us.api.battle.net/wow/item/${itemId}?locale=en_US&apikey=${process.env.API_KEY}`;

  request(
    {
      url: itemUrl,
      json: true
    }, function (err, res, data) {
      if (!err & res.statusCode === 200) {
        callback(db, data);
      } else {
        console.log("Error retrieving item from Blizzard: ", err);
      }
    }
  );
}

// Takes item data as a parameter and uses the 
// item model to create a new row in the database
addItemToDB = (db, item) => {
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
    console.log(`Item ${newItem.name} (${newItem.item_id}) added to the database.`);
  })
  .catch((err) => {
    console.log("Error during item INSERT: ", err);
  });
}

// Checks database for an item by id, currently only returns
// a boolean value to indicate if an item is found.
retrieveItemFromDB = (db, itemId) => {
  let promise = new Promise((resolve, reject) => {
    db.items.findOne({
      where: {
        item_id: itemId
      }
    })
    .then((item) => {
      if (item) {
        console.log("Item in database.");
        resolve(true);
      } else {
        console.log("Item not in database.");
        resolve(false);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
  return promise;
}

// Function to run itemDownloader functionality
downloadNewItemToDb = (db, itemId) => {
  retrieveItemFromDB(db, itemId)
  .then((result) => {
    if(!result) {
      importItemDataFromBlizzard(db, itemId, addItemToDB);
    }
  })
  .catch((err) => {
    console.log("Error retrieving item from database: ", err);
  });
}


module.exports = downloadNewItemToDb;