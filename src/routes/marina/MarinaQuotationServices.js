// Routes
const MarinaQuotationServices = require("../../controllers/marina/MarinaQuotationServices");
const { MarinaQuotationServicesSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/marina/quotations/services/read", MarinaQuotationServices.Read(...instances));
	router.delete(
		"/api/marina/quotations/services/erase",
		validate({ body: MarinaQuotationServicesSchema.erase }),
		MarinaQuotationServices.Erase(...instances)
	);
	router.patch(
		"/api/marina/quotations/services/delete",
		validate({ body: MarinaQuotationServicesSchema.erase }),
		MarinaQuotationServices.Delete(...instances)
	);
	router.post(
		"/api/marina/quotations/services/create",
		validate({ body: MarinaQuotationServicesSchema.create }),
		MarinaQuotationServices.Create(...instances)
	);
	router.put(
		"/api/marina/quotations/services/update",
		validate({ body: MarinaQuotationServicesSchema.update }),
		MarinaQuotationServices.Update(...instances)
	);

	app.use(router);
};
