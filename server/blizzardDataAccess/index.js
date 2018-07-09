const itemDownloader = require("./downloaders/itemDownloader");
const auctionDownloader = require("./downloaders/auctionDownloader");
const ahDumpDownloader = require("./downloaders/ahDumpDownloader");

module.exports = {
  downloadDump: ahDumpDownloader,
  importNewItems: itemDownloader.itemScanner,
  downloadAuctions: auctionDownloader,
  runDataImportAutomation: function(db) {
                            ahDumpDownloader(db)
                              .then((dump) => {
                                return auctionDownloader.runAuctionDownloader(db, dump)
                              })
                              .then((result) => {
                                console.log("In index, running automation, ready to start item download.");
                                itemDownloader.itemScanner(db);
                              })
                              .catch((err) => {
                                console.log("Error during automation: ", err);
                              });
                          }
}