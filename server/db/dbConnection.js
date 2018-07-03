require('dotenv').config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// add db models/tables
db.items = require("./models/item.js")(sequelize, Sequelize);
db.dumps = require("./models/dump.js")(sequelize, Sequelize);

// Use sync to create the table for each model
// Only use this for the initial table creation and then
// remove from running in the code.
// db.items.sync();
// db.dumps.sync();

module.exports = db;

// module.exports = {

  // connectToPool: () => {
  //   const pool = new Pool({
  //     user: process.env.PGUSER,
  //     host: process.env.PGHOST,
  //     database: process.env.PGDATABASE,
  //     password: process.env.PGPASSWORD,
  //     port: process.env.PGPORT,
  //     max: 20,
  //     idleTimeoutMillis: 30000,
  //     connectionTimeoutMillis: 2000
  //   });
  // },

//   makeClientQuery: (newQuery) => {
//     return pool.connect((err, client, release) => {
//       if (err) {
//         return console.log("Error acquiring client: ", err.stack);
//       }
//       client.query(newQuery.queryText, newQuery.queryValues, (err, result) => {
//         release(true);
//         if (err) {
//           return console.log("Error executing query: ", err.stack);
//         }
//         console.log(result);
//         if (newQuery.queryCallback) {
//           newQuery.queryCallback(err, result);
//         }
//       })
//     });
//   }, 

//   query: (text, params, callback) => {
//     return pool.query(text, params, callback);
//   },

//   end: () => {
//     pool.end();
//   }

  

// }

