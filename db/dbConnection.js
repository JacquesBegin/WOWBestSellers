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

  connect: () => {
    
  }, 

  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  end: () => {
    pool.end();
  }

  

}

