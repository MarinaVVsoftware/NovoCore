const Log = require("../helpers/Logs");

// Controller - Users
const Users = {};

// Ejemplo de controller
Users.example = function() {
  return function(req, res) {
    try {
      // respuesta código 200 OK
      res.status(200).send(JSON.stringify("message"));
    } catch (error) {
      Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
      res.status(500).send("Algo ha fallado en el servidor! Error: " + error);
    }
  };
};

module.exports = Users;
