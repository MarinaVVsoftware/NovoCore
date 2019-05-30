// Routes
const MarinaPayments = require("../../controllers/marina/MarinaPayments");
const { MarinaPaymentsSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/Marina-Payment/Read", MarinaPayments.Read(...instances));
	router.delete(
		"/api/Marina-Payment/Erase",
		validate({ body: MarinaPaymentsSchema.erase }),
		MarinaPayments.Erase(...instances)
	);
	router.post(
		"/api/Marina-Payment/Create",
		validate({ body: MarinaPaymentsSchema.create }),
		MarinaPayments.Create(...instances)
	);
	router.put(
		"/api/Marina-Payment/Update",
		validate({ body: MarinaPaymentsSchema.update }),
		MarinaPayments.Update(...instances)
	);

	app.use(router);
};
