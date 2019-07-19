const path = require("path");
const fs = require("fs");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require(path.resolve(__dirname, "../helpers/morgan"));
const monitor = require("express-status-monitor");
const multer = require("multer");
const envs = require(path.resolve(__dirname, "./envs"));
var monitorConfig = require(path.resolve(__dirname, "./monitorConfig"));
const swagger = require(path.resolve(__dirname, "./swagger/swagger"));
const Redis = require(path.resolve(__dirname, "../helpers/RedisClient"));
const MysqlHandler = require(path.resolve(
  __dirname,
  "../helpers/MysqlHandler"
));
const Dropbox = require(path.resolve(__dirname, "../helpers/dropbox"));
const routes = require(path.resolve(__dirname, "./routes"));
/* Helpers para los Controllers */
var { Validator } = require("express-json-validator-middleware");
const newError = require(path.resolve(__dirname, "../helpers/newError"));
const query = require(path.resolve(__dirname, "../helpers/query"));
const Token = require(path.resolve(__dirname, "../helpers/token"));

// Imports de llave pública para la autentificación de JWT.
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../../keys/public.key"),
  "utf8"
);

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
      case "development":
        vars = envs.env.dev;
        redisConfig = envs.redis.dev;
        mysqlConfig = envs.mysql.dev;
        break;
      case "production":
        vars = envs.env.prod;
        redisConfig = envs.redis.prod;
        mysqlConfig = envs.mysql.prod;
        break;
      default:
        vars = envs.env.local;
        redisConfig = envs.redis.local;
        mysqlConfig = envs.mysql.local;
        break;
    }
    // Guarda en express variables de uso global
    app.set("port", vars.port);
    app.set("host", vars.host);
    app.set("authcore", vars.authcore);

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

  /* Reconfiguración del parse a date de JSON */
  Date.prototype.toJSON = function() {
    return new Date(this).toLocaleString("en-US", {
      timeZone: "America/Cancun"
    });
  };

  /* MIDDLEWARES */
  // middleware de morgan con log personalizado
  morgan(app);
  // dependencias para json y http(s)
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());
  //  dependencia para envío de archivos mediante multipart
  const Multer = multer();

  // crea el middleware para validación de endpoints
  var validator = new Validator({ allErrors: true });
  var validate = validator.validate;
  // crea el objeto de routing
  const router = express.Router();
  // instancia de swagger
  // swagger(app, router);
  // inicia el servicio de monitoreo
  app.use(monitor(monitorConfig));

  // Obtiene la instancia de redis
  const redis = new Redis(redisConfig, vars.host);

  // Obtiene el conector de mysql
  const mysql = new MysqlHandler(mysqlConfig);

  // Obtiene la instancia de dropbox
  const dropbox = new Dropbox(dropboxConfig);

  /* Si no se instancian las dependencias clave, truena el server. */
  if (mysql && Token.keys(publicKey)) {
    /* ROUTES */
    // recibe todas las instancias que debe propagar a través de los diferentes endpoints de la API.
    // app: Objeto de la aplicación.
    // router: Router de express.
    // newError: Manejador personalizado de errores.
    // query: Función para la promesa de Mysql
    // validate: Objeto del validador de Schemas.
    // mysqlConnection: Conexión con mysql.
    // redis: Instancia de redis.
    routes(
      app,
      router,
      newError,
      query,
      validate,
      mysql,
      Multer,
      dropbox,
      redis,
      Token
    );

    Log.Success("Configuración del servidor establecida.");
    return { app, vars };
  } else {
    Log.Error(
      "lgo ha fallado con las configuraciones de la API. El servidor ha fallado."
    );
    return { app: null, vars: null };
  }
};
