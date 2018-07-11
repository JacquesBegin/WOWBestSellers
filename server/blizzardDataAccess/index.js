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
                                if (/* TODO: if return value claims the dump in already downloaded
                                restart the runDataImportAutomation process after a set
                                amount of time. */  /*change this true -->*/ true) {
                                  return auctionDownloader.runAuctionDownloader(db, dump)
                                } else {

                                }
                                
                              })
                              .then(() => {
                                console.log("In index, running automation, ready to start item download.");
                                return itemDownloader.itemScanner(db);
                              })
                              .then(() => {
                                console.log(`In runDataImportAutomation repeat .then. Ready to restart the full download promise.`);
                                process.nextTick(() => {this.runDataImportAutomation(db);})
                              })
                              .catch((err) => {
                                console.log("Error during automation: ", err);
                              });
                          }
}