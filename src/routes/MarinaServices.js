// Routes
const MarinaServices = require("../controllers/MarinaServices");
const { MarinaServicesSchema } = require("../schemas/MarinaSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina-Service/Read", MarinaServices.Read(mysqlConnection));
	router.delete(
		"/api/Marina-Service/Erase",
		validate({ body: MarinaServicesSchema.erase }),
		MarinaServices.Erase(mysqlConnection)
	);
	/*router.post(
		"/api/Marina-Service/Create",
		validate({ body: MarinaServicesSchema.create }),
		MarinaServices.Create(mysqlConnection)
	);
	router.put(
		"/api/Marina-Service/Update",
		validate({ body: MarinaServicesSchema.update }),
		MarinaServices.Update(mysqlConnection)
	);*/

	app.use(router);
};
