// Routes
const MarinaPayments = require("../controllers/MarinaPayments");
const { MarinaPaymentsSchema } = require("../schemas/MarinaSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina-Payment/Read", MarinaPayments.Read(mysqlConnection));
	router.delete(
		"/api/Marina-Payment/Erase",
		validate({ body: MarinaPaymentsSchema.erase }),
		MarinaPayments.Erase(mysqlConnection)
	);
	router.post(
		"/api/Marina-Payment/Create",
		validate({ body: MarinaPaymentsSchema.create }),
		MarinaPayments.Create(mysqlConnection)
	);
	router.put(
		"/api/Marina-Payment/Update",
		validate({ body: MarinaPaymentsSchema.update }),
		MarinaPayments.Update(mysqlConnection)
	);

	app.use(router);
};
