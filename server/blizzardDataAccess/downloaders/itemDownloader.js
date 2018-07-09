const request = require("request");

require('dotenv').config();

// Purpose of this file:
// Check the database for an item, if it is not found
// in the database call the blizzard API to download
// the item information and insert it into the database.


// Requests item data from Blizzard and takes a callback 
// to handle the returned data.
importItemDataFromBlizzard = (db, itemId, callback) => {
  let promise = new Promise(function(resolve, reject) {
    let itemUrl = `https://us.api.battle.net/wow/item/${itemId}?locale=en_US&apikey=${process.env.API_KEY}`;

    request(
      {
        url: itemUrl,
        json: true
      }, function (err, res, data) {
        if (!err & res.statusCode === 200) {
          callback(db, data, resolve);
        } else if (err) {
          reject(`Error retrieving item from Blizzard: ERR: ${err}, RES: ${res}, DATA: ${data}, RESPONSECODE: ${res.statusCode} `);
        } else {
          console.log(`statusCode: ${res.statusCode}, itemId: ${itemId}`);
          importItemDataFromBlizzard(db, itemId, callback);
          resolve();
        }
      }
    );
  })
  return promise;
}

// Takes item data as a parameter and uses the 
// item model to create a new row in the database
addItemToDB = (db, item, success) => {
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
    // console.log(`Item ${newItem.name} (${newItem.item_id}) added to the database.`);
    if (success) {
      success();
    }
  })
  .catch((err) => {
    console.log("Error during item INSERT: ", err);
  });
}


importAndAddMultipleItems = (db, items, count, itemsLength) => {
  if (count < itemsLength) {
    downloadNewItemToDb(db, items[count].item_id)
      .then(() => {
        count++;
        // setTimeout(() => {
          process.nextTick(() => {importAndAddMultipleItems(db, items, count, itemsLength)});
        // }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    console.log(`Finished importing all items.`);
  }
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
        // console.log("Item not in database.");
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
  let promise = new Promise(function(resolve, reject) {
    retrieveItemFromDB(db, itemId)
      .then((result) => {
        if(!result) {
          importItemDataFromBlizzard(db, itemId, addItemToDB)
           .then(() => {
            resolve();
           })
           .catch((err) => {
             console.log(err);
           });
        }
      })
      .catch((err) => {
        reject("Error retrieving item from database: ", err);
      });
  });
  return promise;
}


// Functionality to scan database auctions and add item 
// information for items not already in the database.
itemScanner = (db) => {
  console.log("Item scanner started.")
  // Query auction table for items not in the item table.
  // Only retrieve 1 instance of each item from auctions.
  // Restrict results to be a limited quantity (ex. 1000 items)
  // db.auctions.findAll({
  //   attributes: ["item_id"],
  //   where: {},
  //   limit: 1000
  // })
  db.sequelize.query(`SELECT DISTINCT item_id FROM auctions WHERE 
                    item_id NOT IN (SELECT item_id FROM 
                    items) LIMIT 1000;`)
    .then((items) => {
      process.nextTick(() => {importAndAddMultipleItems(db, items[0], 0, items[0].length)});
    })
    .catch((err) => {
      console.log(`Error retrieving item list to import 
      into database`);
    });
}

removeDuplicateItemsFromDB = (db) => {
  db.sequelize.query(`DELETE FROM items a USING items b
                      WHERE a.id < b.id AND a.item_id = 
                      b.item_id;`)
}

module.exports = {
  downloadNewItemToDb: downloadNewItemToDb,
  itemScanner: itemScanner
}

