const { Pool, Client} = require("pg");
const seed = require("./seed/createTables");
require('dotenv').config();

// new database client to handle connections/queries/etc.
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});



// use this function call to drop current tables and recreate
// this will delete any data currently stored in the db
seed.createTables(client);



// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT
// });

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });



// client.connect();

// client.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   client.end();
// });