const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});



module.exports = {

  connectToPool: () => {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  },

  makeClientQuery: (newQuery) => {
    return pool.connect((err, client, release) => {
      if (err) {
        return console.log("Error acquiring client: ", err.stack);
      }
      client.query(newQuery.queryText, newQuery.queryValues, (err, result) => {
        release(true);
        if (err) {
          return console.log("Error executing query: ", err.stack);
        }
        console.log(result);
        if (newQuery.queryCallback) {
          newQuery.queryCallback(err, result);
        }
      })
    });
  }, 

  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  end: () => {
    pool.end();
  }

  

}
