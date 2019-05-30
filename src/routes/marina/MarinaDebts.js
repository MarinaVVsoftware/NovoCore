// Routes
const MarinaDebts = require("../../controllers/marina/MarinaDebts");
const { MarinaDebtSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/Marina-Debt/Read", MarinaDebts.Read(...instances));
	router.delete(
		"/api/Marina-Debt/Erase",
		validate({ body: MarinaDebtSchema.erase }),
		MarinaDebts.Erase(...instances)
	);
	router.post(
		"/api/Marina-Debt/Create",
		validate({ body: MarinaDebtSchema.create }),
		MarinaDebts.Create(...instances)
	);
	router.put(
		"/api/Marina-Debt/Update",
		validate({ body: MarinaDebtSchema.update }),
		MarinaDebts.Update(...instances)
	);

	app.use(router);
};
