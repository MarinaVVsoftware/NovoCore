// Routes
const MarinaPaymentTypes = require("../../controllers/marina/MarinaPaymentTypes");
const { MarinaPaymentTypeSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/Marina-Payment-Type/Read", MarinaPaymentTypes.Read(...instances));
	router.delete(
		"/api/Marina-Payment-Type/Erase",
		validate({ body: MarinaPaymentTypeSchema.erase }),
		MarinaPaymentTypes.Erase(...instances)
	);
	router.post(
		"/api/Marina-Payment-Type/Create",
		validate({ body: MarinaPaymentTypeSchema.create }),
		MarinaPaymentTypes.Create(...instances)
	);
	router.put(
		"/api/Marina-Payment-Type/Update",
		validate({ body: MarinaPaymentTypeSchema.update }),
		MarinaPaymentTypes.Update(...instances)
	);

	app.use(router);
};
