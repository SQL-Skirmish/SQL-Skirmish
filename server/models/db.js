// require ('dotenv').config();
const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

db.connect()
  .then(() => {
    console.log('Connected to ElephantSQL!!!');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

module.exports = db;