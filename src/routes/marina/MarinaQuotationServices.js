// Routes
const MarinaQuotationServices = require("../../controllers/marina/MarinaQuotationServices");
const { MarinaQuotationServicesSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/Marina-Quotation-Service/Read", MarinaQuotationServices.Read(...instances));
	router.delete(
		"/api/Marina-Quotation-Service/Erase",
		validate({ body: MarinaQuotationServicesSchema.erase }),
		MarinaQuotationServices.Erase(...instances)
	);
	router.patch(
		"/api/Marina-Quotation-Service/Delete",
		validate({ body: MarinaQuotationServicesSchema.erase }),
		MarinaQuotationServices.Delete(...instances)
	);
	router.post(
		"/api/Marina-Quotation-Service/Create",
		validate({ body: MarinaQuotationServicesSchema.create }),
		MarinaQuotationServices.Create(...instances)
	);
	router.put(
		"/api/Marina-Quotation-Service/Update",
		validate({ body: MarinaQuotationServicesSchema.update }),
		MarinaQuotationServices.Update(...instances)
	);

	app.use(router);
};
