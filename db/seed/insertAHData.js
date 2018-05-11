module.exports = {

  insertAHRecordToDB: function(ahc, ahData, callback) {
    var auctionCount = ahData.auctions.length;
    for (var i = 0; i < auctionCount; i++) {
      var insertStatement = `INSERT INTO ahRecord
          (groupId, auctionId, item, owner, ownerRealm,
          bid, buyout, quantity, timeLeft, rand, seed,
          context, petSpeciesId, petBreedId, petLevel,
          petQualityId) VALUES
          (null, ${ahData.auctions[i].auc}, ${ahData.auctions[i].item}, 
          '${ahData.auctions[i].owner || null}', '${ahData.auctions[i].ownerRealm || null}',
          ${ahData.auctions[i].bid || 0}, ${ahData.auctions[i].buyout || 0}, ${ahData.auctions[i].quantity || null},
          '${ahData.auctions[i].timeLeft || null}', ${ahData.auctions[i].rand || 0}, ${ahData.auctions[i].seed || 0},
          ${ahData.auctions[i].context || 0}, ${ahData.auctions[i].petSpeciesId || null}, 
          ${ahData.auctions[i].petBreedId || null}, ${ahData.auctions[i].petLevel || null}, 
          ${ahData.auctions[i].petQualityId || null});
          `;
      ahc.query(insertStatement, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          
        }
      });
    }
  }
}