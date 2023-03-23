const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "springstudent",
  password: "springstudent",
  database: "node-complete",
});

module.exports = pool.promise();
