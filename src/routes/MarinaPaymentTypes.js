// Routes
const MarinaPaymentTypes = require("../controllers/MarinaPaymentTypes");
const { MarinaPaymentTypeSchema } = require("../schemas/MarinaSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina-Payment-Type/Read", MarinaPaymentTypes.Read(mysqlConnection));
	router.delete(
		"/api/Marina-Payment-Type/Erase",
		validate({ body: MarinaPaymentTypeSchema.erase }),
		MarinaPaymentTypes.Erase(mysqlConnection)
	);
	router.post(
		"/api/Marina-Payment-Type/Create",
		validate({ body: MarinaPaymentTypeSchema.create }),
		MarinaPaymentTypes.Create(mysqlConnection)
	);
	router.put(
		"/api/Marina-Payment-Type/Update",
		validate({ body: MarinaPaymentTypeSchema.update }),
		MarinaPaymentTypes.Update(mysqlConnection)
	);

	app.use(router);
};
