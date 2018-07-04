require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable": process.env.PGURL,
    "dialect": "postgres",
    "pool": {
      "max": 20,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
