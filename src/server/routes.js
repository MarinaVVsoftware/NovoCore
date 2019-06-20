// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
/* Middlewares! */
const Auth = require(path.resolve(__dirname, "../middlewares/Auth"));
const redisHandler = require(path.resolve(
  __dirname,
  "../middlewares/RedisHandler"
));
const ErrorHandler = require(path.resolve(
  __dirname,
  "../middlewares/ErrorHandler"
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
/* Imports de Clients */
const BankAccount = require(path.resolve(
  __dirname,
  "../routes/clients/BankAccount"
));
const Clients = require(path.resolve(__dirname, "../routes/clients/Clients"));
const ElectronicSignature = require(path.resolve(
  __dirname,
  "../routes/clients/ElectronicSignature"
));
const ElectronicWallet = require(path.resolve(
  __dirname,
  "../routes/clients/ElectronicWallet"
));
const ElectronicWalletHistoric = require(path.resolve(
  __dirname,
  "../routes/clients/ElectronicWalletHistoric"
));
const SocialReason = require(path.resolve(
  __dirname,
  "../routes/clients/SocialReason"
));
/* Imports de Marina */
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
const MarinaQuotations = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaQuotations"
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
const MarinaServices = require(path.resolve(
  __dirname,
  "../routes/marina/MarinaServices"
));
const Slips = require(path.resolve(__dirname, "../routes/marina/Slips"));
const SlipOccupation = require(path.resolve(
  __dirname,
  "../routes/marina/SlipsOccupation"
));
const SlipTypes = require(path.resolve(
  __dirname,
  "../routes/marina/SlipTypes"
));
/* Imports de Users y RRHH */
const Incidents = require(path.resolve(__dirname, "../routes/rrhh/Incidents"));
const IncidentTypes = require(path.resolve(
  __dirname,
  "../routes/rrhh/IncidentTypes"
));
const Ranks = require(path.resolve(__dirname, "../routes/rrhh/Ranks"));
const Roles = require(path.resolve(__dirname, "../routes/rrhh/Roles"));
const Status = require(path.resolve(__dirname, "../routes/rrhh/Status"));
const Users = require(path.resolve(__dirname, "../routes/rrhh/Users"));

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
    redis,
    redisHandler
  ];

  /* Middleware: Autenticación */
  Auth(app);

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

  /* Rutas del Modelo de Clients */
  BankAccount(app, router, mysqlConnection);
  Clients(...instances);
  ElectronicSignature(...instances);
  ElectronicWallet(app, router, mysqlConnection);
  ElectronicWalletHistoric(app, router, mysqlConnection);
  SocialReason(app, router, mysqlConnection);

  /* Rutas del Modelo de Marina */
  MarinaDebts(...instances);
  MarinaPayments(...instances);
  MarinaPaymentTypes(...instances);
  MarinaQuotations(...instances);
  MarinaQuotationServices(...instances);
  MarinaQuotationTimeline(...instances);
  MarinaQuotationTimelineTypes(...instances);
  MarinaServices(...instances);
  Slips(...instances);
  SlipOccupation(...instances);
  SlipTypes(...instances);

  /* Rutas del Modelo de Users y RRHH */
  Incidents(...instances);
  IncidentTypes(...instances);
  Ranks(...instances);
  Roles(...instances);
  Status(...instances);
  Users(...instances);

  /* Middleware: Manejo de Errores */
  ErrorHandler(app);

  Log.Success("Rutas de la API cargadas.");
};
