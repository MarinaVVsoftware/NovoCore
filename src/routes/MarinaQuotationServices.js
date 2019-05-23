// Routes
const MarinaQuotationServices = require("../controllers/MarinaQuotationServices");
const { MarinaQuotationServicesSchema } = require("../schemas/MarinaSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina-Quotation-Service/Read", MarinaQuotationServices.Read(mysqlConnection));
	router.delete(
		"/api/Marina-Quotation-Service/Erase",
		validate({ body: MarinaQuotationServicesSchema.erase }),
		MarinaQuotationServices.Erase(mysqlConnection)
	);
	router.patch(
		"/api/Marina-Quotation-Service/Delete",
		validate({ body: MarinaQuotationServicesSchema.erase }),
		MarinaQuotationServices.Delete(mysqlConnection)
	);
	router.post(
		"/api/Marina-Quotation-Service/Create",
		validate({ body: MarinaQuotationServicesSchema.create }),
		MarinaQuotationServices.Create(mysqlConnection)
	);
	router.put(
		"/api/Marina-Quotation-Service/Update",
		validate({ body: MarinaQuotationServicesSchema.update }),
		MarinaQuotationServices.Update(mysqlConnection)
	);

	app.use(router);
};
