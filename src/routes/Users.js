/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Users = require('../controllers/Users');
const UserSchema = require('../schemas/UserSchema');
const newError = require('../helpers/newError');

var { Validator } = require('express-json-validator-middleware');
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	// Ruta para mandar a llamar a la funcion de lectura de datos
	router.get('/api/Users/Read', Users.Read(mysqlConnection));
	router.post('/api/Users/ReadId', validate({ body: UserSchema.email }), Users.ReadId(mysqlConnection));
	router.delete('/api/Users/Delete', validate({ body: UserSchema.email }), Users.Delete(mysqlConnection));
	router.post('/api/Users/Create', validate({ body: UserSchema.create }), Users.Create(mysqlConnection));
	router.put('/api/Users/Update', validate({ body: UserSchema.update }), Users.Update(mysqlConnection));
	router.get('/api/Users/Permissions', validate({ body: UserSchema.email }), Users.Permission(mysqlConnection));

	// Uso de las rutas
	app.use(router);
	app.use((err, req, res, next) => {
		const errorString = JSON.stringify(err.validationErrors);
		next(newError(errorString, 400));
	});
};
