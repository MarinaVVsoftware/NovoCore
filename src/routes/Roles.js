// ejemplo de instancia de controlador
const Roles = require("../controllers/Roles");
const RolSchema = require("../schemas/RolSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;
module.exports = (app, router, mysqlConnection) => {
	// Ruta para mandar a llamar a la funcion de lectura de datos
	router.get("/api/Roles/Read", Roles.Read(mysqlConnection));
	router.delete("/api/Roles/Erase", validate({ body: RolSchema.erase }), Roles.Erase(mysqlConnection));
	router.post("/api/Roles/Create", validate({ body: RolSchema.create }), Roles.Create(mysqlConnection));
	router.put("/api/Roles/Update", validate({ body: RolSchema.update }), Roles.Update(mysqlConnection));

	app.use(router);
};
