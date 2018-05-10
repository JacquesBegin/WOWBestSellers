const { Pool, Client} = require("pg");

require('dotenv').config();

// new database client to handle connections/queries/etc.
module.exports = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});





