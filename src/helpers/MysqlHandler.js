const mysql = require("mysql2");

/** Handler para los conexiones a Mysql
 */
class MysqlHandler {
  constructor(config) {
    this.connection = null;

    this.dbConfig = {
      config: config.host,
      port: config.port,
      localAddress: config.localAddress,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: true,
      insecureAuth: true
    };

    this.HandleConnection();
  }

  HandleConnection() {
    try {
      this.connection = mysql.createConnection(this.dbConfig);

      this.connection.connect(error => {
        if (error) {
          console.log("Error al conectar con la DB: ", error);
          /* Espera un par de segundos para evitar un Hot Loop, luego reinicia
        la conexión. */
          setTimeout(this.HandleConnection, 2000);
        }
      });

      this.connection.on("error", error => {
        console.log("DB Error: ", error);
        /* Detecta errores de pérdida de conexión. Si sucede alguno, intenta
      la reconexión, para cualquier otro error arroja una excepción. */
        if (error.code === "PROTOCOL_CONNECTION_LOST") this.HandleConnection();
      });

      /* Output */
      console.log("base de datos inicializada");
    } catch (error) {
      console.log("DB Error: ", error);
      this.connection = null;
    }
  }
}

module.exports = MysqlHandler;
