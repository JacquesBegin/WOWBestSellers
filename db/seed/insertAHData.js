module.exports = {

  insertAHRecordToDB: function(client, record) {

    var insertStatement = `INSERT INTO ahRecord
        (groupId, auctionId, item, owner, ownerRealm,
        bid, buyout, quantity, timeLeft, rand, seed,
        context, petSpeciesId, petBreedId, petLevel,
        petQualityId) VALUES
        (null, ${record.auc}, ${record.item}, 
        '${record.owner || null}', '${record.ownerRealm || null}',
        ${record.bid || null}, ${record.buyout || null}, ${record.quantity || null},
        '${record.timeLeft || null}', ${record.rand || null}, ${record.seed || null},
        ${record.context || null}, ${record.petSpeciesId || null}, 
        ${record.petBreedId || null}, ${record.petLevel || null}, 
        ${record.petQualityId || null});
        `;

    client.connect((err) => {
      if(!err) {
        client.query(`${insertStatement}}`, 
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