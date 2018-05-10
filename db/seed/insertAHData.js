module.exports = {

  insertAHRecordToDB: function(client, record) {

    var insertStatement = `INSERT INTO ahRecord
        (groupId, auctionId, item, owner, ownerRealm,
        bid, buyout, quantity, timeLeft, rand, seed,
        context, petSpeciesId, petBreedId, petLevel,
        petQualityId) VALUES
        (null, ${record.auc}, ${record.item}, 
        '${record.owner}', '${record.ownerRealm}',
        ${record.bid}, ${record.buyout}, ${record.quantity},
        '${record.timeLeft}', ${record.rand}, ${record.seed},
        ${record.context}, ${record.petSpeciesId}, 
        ${record.petBreedId}, ${record.petLevel}, 
        ${record.petQualityId});
        `;

    client.connect((err) => {
      if(!err) {
        client.query(`${this.queries.dropTables} 
                      ${this.queries.createTables}`, 
                      (err, result) => {
                        if(err) {
                          console.log(err);
                        } else {
                          
                        }
                        client.end();
                      });
      } else {
        console.log(err);
      }
    });
  }
}