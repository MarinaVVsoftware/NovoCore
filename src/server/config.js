const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const swagger = require("./swagger/swagger");
const routes = require("./routes");
const monitor = require("express-status-monitor");
const Log = require("../helpers/Logs");
var monitorConfig = require("./monitorConfig");
const mysql = require("../helpers/database");

// este módulo sirve para separar la configuración del servidor
// del archivo que instancia el servidor.
module.exports = app => {
  /* SETTINGS */
  //establece el puerto, ya sea por variable de entorno o predeterminado.
  app.set("port", process.env.PORT || 8080);

  /* MIDDLEWARES */
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  // crea el objeto de routing
  const router = express.Router();
  // instancia de swagger
  swagger(app, router);
  // inicia el servicio de monitoreo
  app.use(monitor(monitorConfig));

  const mysqlConnection = mysql();

  /* ROUTES */
  routes(app, router, mysqlConnection);

  Log.Success("Configuración del servidor establecida.");
  return app;
};
