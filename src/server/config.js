const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const swagger = require(path.resolve(__dirname, "./swagger/swagger"));
const routes = require(path.resolve(__dirname, "./routes"));
const monitor = require("express-status-monitor");
const mysql = require(path.resolve(__dirname, "../helpers/database"));
var { Validator } = require("express-json-validator-middleware");
var monitorConfig = require(path.resolve(__dirname, "./monitorConfig"));
/* Helpers para los Controllers */
const newError = require(path.resolve(__dirname, "../helpers/newError"));
const Query = require(path.resolve(__dirname, "../helpers/query"));

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

  var validator = new Validator({ allErrors: true });
  var validate = validator.validate;
  // crea el objeto de routing
  const router = express.Router();
  // instancia de swagger
  swagger(app, router);
  // inicia el servicio de monitoreo
  app.use(monitor(monitorConfig));

  const mysqlConnection = mysql();

  /* ROUTES */
  // recibe todas las instancias que debe propagar a través
  // de los diferentes endpoints de la API.
  routes(app, router, newError, Query, validate, mysqlConnection);

  Log.Success("Configuración del servidor establecida.");
  return app;
};
