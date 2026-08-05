require("dotenv/config")
const { Pool } = require("pg")

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // Using default for development, need to change to a more secure number
  port: process.env.DB_PORT
});


module.exports = pool
