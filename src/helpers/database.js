const mysql = require("mysql");
// var { database } = require("../server/keys");
var { database_local } = require("../server/keys");
console.log(database_local);
// fix para el paso de variables de entorno a la config de mysql.
// var host = database.host;
// var port = database.port;
// var localAddress = database.localAddress;
// var user = database.user;
// var password = database.password;
// var database = database.database;

// configuración para localhost
var host = database_local.host;
var port = database_local.port;
var localAddress = database_local.localAddress;
var user = database_local.user;
var password = database_local.password;
var database = database_local.database;

//Connection Settings To DB Server
const mysqlConnection = mysql.createConnection({
  host,
  port,
  localAddress,
  user,
  password,
  database,

  multipleStatements: true,
  insecureAuth: true
});

//Status about connection
function createConnection() {
  mysqlConnection.connect(function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log("db is connected");
    }
  });

  return mysqlConnection;
}

module.exports = createConnection;
