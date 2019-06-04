// Routes
const MarinaDebts = require("../../controllers/marina/MarinaDebts");
const { MarinaDebtSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/marina/quotations/debt/read", MarinaDebts.Read(...instances));
	router.delete(
		"/api/marina/quotations/debt/erase",
		validate({ body: MarinaDebtSchema.erase }),
		MarinaDebts.Erase(...instances)
	);
	router.post(
		"/api/marina/quotations/debt/create",
		validate({ body: MarinaDebtSchema.create }),
		MarinaDebts.Create(...instances)
	);
	router.put(
		"/api/marina/quotations/debt/update",
		validate({ body: MarinaDebtSchema.update }),
		MarinaDebts.Update(...instances)
	);

	app.use(router);
};
