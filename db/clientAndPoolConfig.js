const { Pool, Client} = require("pg");

require('dotenv').config();

// new database client to handle connections/queries/etc.
module.exports = {
  
  client: new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
          }),

  pool: new Pool({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: process.env.PGPORT,
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000
        })

}


