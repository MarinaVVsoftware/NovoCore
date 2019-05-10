// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const Users = require('../routes/Users');
const Marina = require('../routes/Marina');
const Log = require('../helpers/Logs');

module.exports = (app, router, mysqlConnection) => {
	/* Rutas de login */
	Users(app, router, mysqlConnection);
	Marina(app, router, mysqlConnection);

	Log.Success('Rutas de la API cargadas.');
};
