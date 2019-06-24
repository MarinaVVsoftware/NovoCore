const mysql = require("mysql2");
//Conexión a la DB de mysql
function createConnection(config) {
  /* fix para el paso de variables de entorno a la config de mysql.
  la función no permite recibir objetos. */
  var host = config.host;
  var port = config.port;
  var localAddress = config.localAddress;
  var user = config.user;
  var password = config.password;
  var database = config.database;

  console.log("trying connection");
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
  console.log("connection tried");
  if (connection) {
    console.log("base de datos inicializada");
    return connection;
  } else {
    return null;
  }
}

module.exports = createConnection;
