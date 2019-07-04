var mysql = require("dotenv/config");
var mysql = require("mysql");
var fs = require("fs");

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// console.log(process.env.MYSQL_SB_PW);

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: process.env.MYSQL_SB_PW,
  database: "ice_creamDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  sql = fs.readFileSync('select.sql').toString();
  connection.query(
    sql
    , function (err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    })
}