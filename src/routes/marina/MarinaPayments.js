// Routes
const MarinaPayments = require("../../controllers/marina/MarinaPayments");
const { MarinaPaymentsSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/marina/quotations/payment/read", MarinaPayments.Read(...instances));
	router.delete(
		"/api/marina/quotations/payment/erase",
		validate({ body: MarinaPaymentsSchema.erase }),
		MarinaPayments.Erase(...instances)
	);
	router.post(
		"/api/marina/quotations/payment/create",
		validate({ body: MarinaPaymentsSchema.create }),
		MarinaPayments.Create(...instances)
	);
	router.put(
		"/api/marina/quotations/payment/update",
		validate({ body: MarinaPaymentsSchema.update }),
		MarinaPayments.Update(...instances)
	);

	app.use(router);
};
