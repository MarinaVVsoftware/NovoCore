// Routes
const MarinaPaymentTypes = require("../../controllers/marina/MarinaPaymentTypes");
const { MarinaPaymentTypeSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/marina/quotations/payment-type/read", MarinaPaymentTypes.Read(...instances));
	router.delete(
		"/api/marina/quotations/payment-type/erase",
		validate({ body: MarinaPaymentTypeSchema.erase }),
		MarinaPaymentTypes.Erase(...instances)
	);
	router.post(
		"/api/marina/quotations/payment-type/create",
		validate({ body: MarinaPaymentTypeSchema.create }),
		MarinaPaymentTypes.Create(...instances)
	);
	router.put(
		"/api/marina/quotations/payment-type/update",
		validate({ body: MarinaPaymentTypeSchema.update }),
		MarinaPaymentTypes.Update(...instances)
	);

	app.use(router);
};
