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
    dropTables: `DROP TABLE IF EXISTS ahrecord;
                DROP TABLE IF EXISTS ahdump;
                DROP TABLE IF EXISTS recipe;`,
    createTables: `CREATE TABLE ahdump (
                  id SERIAL primary key,
                  url text,
                  lastmodified int,
                  createdate int,
                  downloadduration int
                  );
                  CREATE TABLE ahrecord (
                  id SERIAL primary key,
                  groupid int references ahdump(id),
                  auctionid int,
                  item int,
                  owner text,
                  ownerrealm text,
                  bid int,
                  buyout int,
                  quantity int,
                  timeleft text,
                  rand int,
                  seed int,
                  context int,
                  petspeciesid int,
                  petbreedid int,
                  petlevel int,
                  petqualityid int
                  );
                  CREATE TABLE recipe (
                  id SERIAL primary key,
                  recipeid int,
                  name text,
                  profession text,
                  icon text
                  );
                  `
  }
}