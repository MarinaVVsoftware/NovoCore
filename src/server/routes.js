// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const Users = require("../routes/Users");
const Marina = require("../routes/Marina");
const Log = require("../helpers/Logs");
const Auth = require("../routes/Auth");
const Roles = require("../routes/Roles");
const Clients = require("../routes/Clients");
const Bank_Account = require("../routes/Bank_Account");
const Electronic_Wallet_Historic = require("../routes/Electronic_Wallet_Historic");
const Electronic_wallet = require("../routes/Electronic_Wallet");
const Social_Reason = require("../routes/Social_Reason");
const ErrorHandler = require("../routes/ErrorHandler");

module.exports = (app, router, mysqlConnection) => {
  /* Rutas de login */
  //Toma como argumento app para la verificación del JWT
  //Auth(app);
  Users(app, router, mysqlConnection);
  Roles(app, router, mysqlConnection);
  Marina(app, router, mysqlConnection);
  Clients(app, router, mysqlConnection);
  Bank_Account(app, router, mysqlConnection);
  Electronic_Wallet_Historic(app, router, mysqlConnection);
  Electronic_wallet(app, router, mysqlConnection);
  Social_Reason(app, router, mysqlConnection);
  ErrorHandler(app);

  Log.Success("Rutas de la API cargadas.");
};
