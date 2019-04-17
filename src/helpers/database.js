const mysql = require("mysql");
var { database } = require("../server/keys");

//Connection Settings To DB Server
const mysqlConnection = mysql.createConnection({
  database,
  multipleStatements: true
});

//Status about connection
mysqlConnection.connect(function(err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("db is connected");
  }
});

module.exports = mysqlConnection;
