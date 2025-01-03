const mysql = require("mysql2");
const path = require("path");
const debug = require("debug")("app:dbconnector");

require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "temp",
});

db.connect((err) => {
  if (err) {
    debug("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  debug("Connected to MySQL");
});

module.exports = db;
