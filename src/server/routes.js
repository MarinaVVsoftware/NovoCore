// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const Users = require("../routes/Users");
const Log = require("../helpers/Logs");

module.exports = (app, router) => {
  /* Rutas de login */
  Users(app, router);

  Log.Success("Rutas de la API cargadas.");
};
