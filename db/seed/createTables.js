module.exports = {
  
  dropTables: function() {
    

  },

  createTables: function(client) {
    
    client.connect((err) => {
      if(err) {
        console.log(err);
      } else {
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
      }
    });

  },

  queries: {
    dropTables: `DROP TABLE IF EXISTS ahRecord;
                DROP TABLE IF EXISTS ahDump;
                DROP TABLE IF EXISTS recipe;`,
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
                  CREATE TABLE recipe (
                  id SERIAL primary key,
                  recipeId int,
                  name text,
                  profession text,
                  icon text
                  );
                  `
  }
}