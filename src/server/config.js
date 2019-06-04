const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const monitor = require("express-status-monitor");
const multer = require("multer");
const envs = require("./envs");
var monitorConfig = require(path.resolve(__dirname, "./monitorConfig"));
const swagger = require(path.resolve(__dirname, "./swagger/swagger"));
const mysql = require(path.resolve(__dirname, "../helpers/database"));
const Dropbox = require("../helpers/Dropbox");
const routes = require(path.resolve(__dirname, "./routes"));
/* Helpers para los Controllers */
var { Validator } = require("express-json-validator-middleware");
const newError = require(path.resolve(__dirname, "../helpers/newError"));
const Query = require(path.resolve(__dirname, "../helpers/query"));

// este módulo sirve para separar la configuración del servidor
// del archivo que instancia el servidor.
module.exports = app => {
  let redisConfig = {};
  let mysqlConfig = {};
  let dropboxConfig = {};
  let vars = {};
  /* SETTINGS */
  //establece las configuraciones de host y port
  if (envs.env.NODE_ENV) {
    switch (envs.env.NODE_ENV) {
      case "local":
        vars = envs.env.local;
        redisConfig = envs.redis.local;
        mysqlConfig = envs.mysql.local;
        break;
      case "dev" || "development":
        vars = envs.env.dev;
        redisConfig = envs.redis.dev;
        mysqlConfig = envs.mysql.dev;
        break;
      case "prod" || "production":
        vars = envs.env.prod;
        redisConfig = envs.redis.prod;
        mysqlConfig = envs.mysql.prod;
        break;
      default:
        app.set("port", 8085);
        app.set("host", "http://localhost:8085/");
        break;
    }

    //carga de variables que no dependen del entorno
    dropboxConfig = envs.dropbox;

    Log.Success(
      "\nVariables de entorno cargadas. Entorno: " + envs.env.NODE_ENV
    );
  } else {
    Log.Error(
      "No se ha podido instanciar las variables de entorno. El servidor ha fallado."
    );
    return null;
  }

  /* MIDDLEWARES */
  // Solo instancia morgan en entorno dev y local
  if ((envs.env.NODE_ENV = "dev" || "development" || "local"))
    app.use(morgan("dev"));
  // dependencias para json y http(s)
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  const Multer = multer();

  // crea el middleware para validación de endpoints
  var validator = new Validator({ allErrors: true });
  var validate = validator.validate;
  // crea el objeto de routing
  const router = express.Router();
  // instancia de swagger
  swagger(app, router);
  // inicia el servicio de monitoreo
  app.use(monitor(monitorConfig));

  // Obtiene el conector de mysql
  const mysqlConnection = mysql(mysqlConfig);

  // Obtiene la instancia de dropbox
  const dropbox = new Dropbox(dropboxConfig);

  /* ROUTES */
  // recibe todas las instancias que debe propagar a través de los diferentes endpoints de la API.
  // app - Objeto de la aplicación.
  // router - Router de express.
  // newError - Manejador personalizado de errores.
  // Query - Función para la promesa de Mysql
  // validate - Objeto del validador de Schemas.
  // mysqlConnection - Conexión con mysql.
  routes(
    app,
    router,
    newError,
    Query,
    validate,
    mysqlConnection,
    Multer,
    dropbox
  );

  /* Si no se instancian las dependencias clave, truena el server. */
  if (mysqlConnection) {
    Log.Success("Configuración del servidor establecida.");
    return { app, vars };
  } else {
    Log.Error(
      "lgo ha fallado con las configuraciones de la API. El servidor ha fallado."
    );
    return null;
  }
};
