const mysql = require("mysql");
var { database } = require("../server/keys");
// var { database_local } = require("../server/keys");
console.log(database);
// fix para el paso de variables de entorno a la config de mysql.
var host = "66.117.0.76";
var port = "3306";
var localAddress = "66.117.0.76";
var user = "marina32";
var password = "MarinA13..";
var database = "marina32_novo_db";

// configuración para localhost
// var host = database_local.host;
// var user = database_local.user;
// var password = database_local.password;
// var database = database_local.database;

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

//Produccion local
// const mysqlConnection = mysql.createConnection({
//   host,
//   user,
//   password,
//   database,

//   multipleStatements: true,
//   insecureAuth: true
// });
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
