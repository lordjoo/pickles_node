require("dotenv").config("../../../.env");

const mysql = require("mysql");

// ---------------------------------------------------------------

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// ---------------------------------------------------------------

const dropDatabaseQuery = `DROP DATABASE IF EXISTS ${process.env.DB_NAME};`;
const createDatabaseQuery = `CREATE DATABASE ${process.env.DB_NAME} CHARSET=utf8 COLLATE=utf8_unicode_ci;`;

// ---------------------------------------------------------------

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(dropDatabaseQuery, function (err, result) {
    if (err) throw err;
    console.log("Database Droped");
  });

  con.query(createDatabaseQuery, function (err, result) {
    if (err) throw err;
    console.log("Database Created");
  });

  con.end(function (err) {
    if (err) throw err;
    console.log("Close the database connection.");
    process.exit(0);
  });
});

// ---------------------------------------------------------------
