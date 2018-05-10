module.exports = {
  
  dropTables: function() {
    

  },

  createTables: function(client) {
    
    client.connect((err) => {
      if(!err) {
        client.query(`${this.queries.dropTables} 
                      ${this.queries.createTables}`, 
                      (err, result) => {
                        if(err) {
                          console.log(err);
                        } else {
                          console.log(`Tables dropped and recreated.`);
                        }
                        client.end();
                      });
      } else {
        console.log(err);
      }
    });

  },

  queries: {
    dropTables: `DROP TABLE IF EXISTS ahRecord;
                DROP TABLE IF EXISTS ahDump;`,
    createTables: `CREATE TABLE ahDump (
                  id SERIAL primary key,
                  url text,
                  lastModified int,
                  createDate int,
                  downloadDuration int
                  );
                  CREATE TABLE ahRecord (
                  id SERIAL primary key,
                  groupId int references ahDump(id),
                  auctionId int,
                  item int,
                  owner text,
                  ownerRealm text,
                  bid int,
                  buyout int,
                  quantity int,
                  timeLeft int,
                  rand int,
                  seed int,
                  context int,
                  petSpeciesId int,
                  petBreedId int,
                  petLevel int,
                  petQualityId int
                  );
                  `
  }
}