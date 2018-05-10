const ahData = require("../ahData/AHData_1525812207294.json");

console.log("Realms: ", ahData.realms);

var auctionCount = ahData.auctions.length;
var allAuctionProperties = {};
var scanCount = 0;

console.log("Auction Count: ", auctionCount);

// for (var i = 0; i < auctionCount; i++) {
for (var i = 0; i < auctionCount; i++) {
  for (var prop in ahData.auctions[i]) {
    if (ahData.auctions[0].hasOwnProperty(prop)) {
      if (!allAuctionProperties.hasOwnProperty(prop)) {
        allAuctionProperties[prop] = "";
        console.log(`property ${prop} added`);
      }
    }
  }
  scanCount++;
}

console.log("allAuctionProperties: ", allAuctionProperties);
console.log("Scan Count: ", scanCount);


