// Routes
const MarinaDebts = require("../controllers/MarinaDebts");
const { MarinaDebtSchema } = require("../schemas/MarinaSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina-Debt/Read", MarinaDebts.Read(mysqlConnection));
	router.delete(
		"/api/Marina-Debt/Erase",
		validate({ body: MarinaDebtSchema.erase }),
		MarinaDebts.Erase(mysqlConnection)
	);
	router.post(
		"/api/Marina-Debt/Create",
		validate({ body: MarinaDebtSchema.create }),
		MarinaDebts.Create(mysqlConnection)
	);
	router.put(
		"/api/Marina-Debt/Update",
		validate({ body: MarinaDebtSchema.update }),
		MarinaDebts.Update(mysqlConnection)
	);

	app.use(router);
};
