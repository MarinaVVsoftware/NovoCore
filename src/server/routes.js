// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
/* Middlewares! */
const Auth = require(path.resolve(__dirname, "../middlewares/Auth"));
const ErrorHandler = require(path.resolve(
  __dirname,
  "../middlewares/ErrorHandler"
));
const RedisHandler = require("../middlewares/RedisHandler");

/* Imports de Users y RRHH */
const Users = require(path.resolve(__dirname, "../routes/Users"));
const Roles = require(path.resolve(__dirname, "../routes/Roles"));
/* Imports de Clients */
const Clients = require(path.resolve(__dirname, "../routes/Clients"));
const Bank_Account = require(path.resolve(__dirname, "../routes/Bank_Account"));
const Social_Reason = require(path.resolve(
  __dirname,
  "../routes/Social_Reason"
));
const Electronic_Wallet_Historic = require(path.resolve(
  __dirname,
  "../routes/electronicWallet/Electronic_Wallet_Historic"
));
const Electronic_wallet = require(path.resolve(
  __dirname,
  "../routes/electronicWallet/Electronic_Wallet"
));
const ElectronicSignature = require(path.resolve(
  __dirname,
  "../routes/electronicSignature/ElectronicSignature"
));
/* Imports de Marina */
const Marina = require(path.resolve(__dirname, "../routes/marina/Marina"));
const MarinaServices = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaServices"
));
const MarinaQuotationServices = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaQuotationServices"
));
const MarinaQuotationTimeline = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaQuotationTimeline"
));
const MarinaQuotationTimelineTypes = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaQuotationTimelineTypes"
));
const MarinaDebts = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaDebts"
));
const MarinaPayments = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaPayments"
));
const MarinaPaymentTypes = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaPaymentTypes"
));
/* Rutas de Marina: Slips */
const SlipOccupations = require(path.resolve(
  __dirname,
  "../routes/marina/SlipsOccupation"
));
const Slips = require(path.resolve(__dirname, "../routes/marina/Slips"));
const SlipTypes = require(path.resolve(
  __dirname,
  "../routes/marina/SlipTypes"
));
/* Imports de Boats */
const BoatDocuments = require(path.resolve(
  __dirname,
  "../routes/boats/BoatDocuments"
));
const BoatDocumentTypes = require(path.resolve(
  __dirname,
  "../routes/boats/BoatDocumentTypes"
));
const BoatElectricity = require(path.resolve(
  __dirname,
  "../routes/boats/BoatElectricity"
));
const Boats = require(path.resolve(__dirname, "../routes/boats/Boats"));
const CableTypes = require(path.resolve(
  __dirname,
  "../routes/boats/CableTypes"
));
const Captains = require(path.resolve(__dirname, "../routes/boats/Captains"));
const Engines = require(path.resolve(__dirname, "../routes/boats/Engines"));
const Responsible = require(path.resolve(
  __dirname,
  "../routes/boats/Responsible"
));
const SocketTypes = require(path.resolve(
  __dirname,
  "../routes/boats/SocketTypes"
));

module.exports = (
  app,
  router,
  newError,
  Query,
  validate,
  mysqlConnection,
  multer,
  dropbox,
  redis
) => {
  const instances = [
    app,
    router,
    newError,
    Query,
    validate,
    mysqlConnection,
    multer,
    dropbox,
    redis
  ];

  /* Middleware: Autenticación */
  //Auth(app);
  RedisHandler(app, redis);

  /* Rutas del Modelo de Users y RRHH */
  Users(app, router, mysqlConnection);
  Roles(app, router, mysqlConnection);

  /* Rutas del Modelo de Clients */
  // Clients(app, router, mysqlConnection);
  Clients(...instances);
  Bank_Account(app, router, mysqlConnection);
  Social_Reason(app, router, mysqlConnection);
  Electronic_Wallet_Historic(app, router, mysqlConnection);
  Electronic_wallet(app, router, mysqlConnection);
  ElectronicSignature(...instances);

  /* Rutas del Modelo de Marina */
  Marina(...instances);
  MarinaServices(...instances);
  MarinaQuotationServices(...instances);
  MarinaQuotationTimeline(...instances);
  MarinaQuotationTimelineTypes(...instances);
  MarinaDebts(...instances);
  MarinaPayments(...instances);
  MarinaPaymentTypes(...instances);

  /* Rutas del modelo de Marina: Slips */
  SlipOccupations(...instances);
  Slips(...instances);
  SlipTypes(...instances);

  /* Rutas del Modelo de Boats */
  BoatDocuments(...instances);
  BoatDocumentTypes(...instances);
  BoatElectricity(...instances);
  Boats(...instances);
  CableTypes(...instances);
  Captains(...instances);
  Engines(...instances);
  Responsible(...instances);
  SocketTypes(...instances);

  /* Middleware: Manejo de Errores */
  ErrorHandler(app);

  Log.Success("Rutas de la API cargadas.");
};
