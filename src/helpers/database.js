const mysql = require("mysql2");
// var { database } = require("../server/keys");
var { database_local } = require("../server/keys");
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
function createConnection() {
  const connection = mysql.createConnection({
    host,
    port,
    localAddress,
    user,
    password,
    database,
    multipleStatements: true,
    insecureAuth: true
  });
  if (connection) console.log("base de datos inicializada");
  return connection;
}

module.exports = createConnection;
