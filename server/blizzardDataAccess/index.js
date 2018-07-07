const itemDownloader = require("./downloaders/itemDownloader");
const auctionDownloader = require("./downloaders/auctionDownloader");
const ahDumpDownloader = require("./downloaders/ahDumpDownloader");

module.exports = function(db) {
  return(
    {
      downloadDump: ahDumpDownloader(db)
    }
  )
}