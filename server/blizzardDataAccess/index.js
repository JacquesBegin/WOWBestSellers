const itemDownloader = require("./downloaders/itemDownloader");
const auctionDownloader = require("./downloaders/auctionDownloader");
const ahDumpDownloader = require("./downloaders/ahDumpDownloader");

module.exports = {
  downloadDump: ahDumpDownloader,
  importNewItems: itemDownloader.itemScanner
}