const mysql = require("mysql2");

/** Handler para los conexiones a Mysql
 */
class MysqlHandler {
  constructor(config) {
    this.pool = null;

    const dbConfig = {
      // connection options
      host: config.host,
      port: config.port,
      localAddress: config.localAddress,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: true,
      insecureAuth: true,
      // pool options
      waitForConnections: true,
      connectionLimit: 30,
      queueLimit: 0
    };

    this.HandleConnection(dbConfig, config.debugMode);
  }

  HandleConnection(config, debugMode) {
    try {
      /* Crea la pool de conexiones */
      this.pool = mysql.createPool(config);

      /* Evento emitido cuando una conexión es añadida a la pool. Sucede despues de
    cualquier actividad de una conexión, justo antes de ser manejado por la promesa
    o el callback. */
      this.pool.on("acquire", connection => {
        if (debugMode === "true")
          console.log("Connection %d acquired", connection.threadId);
      });

      /* Evento emitido cuando una conexión es encolada. */
      this.pool.on("enqueue", () => {
        if (debugMode === "true")
          console.log("Waiting for available connection slot");
      });

      /* Evento emitido cada vez que una conexión es liberada de nuevo de la pool. */
      this.pool.on("release", connection => {
        if (debugMode === "true")
          console.log("Connection %d released", connection.threadId);
      });
    } catch (error) {
      console.log("DB Pool ha fallado: " + error);
    }
  }
}

module.exports = MysqlHandler;
