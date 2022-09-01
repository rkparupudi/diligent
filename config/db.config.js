"use strict";

const mysql = require("mysql");

const dbConn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "diligent",
});
dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database Connected!");
});
module.exports = dbConn;
