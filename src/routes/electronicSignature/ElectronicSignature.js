// Routes
const ElectronicSignature = require("../../controllers/electronicSignature/ElectronicSignature");
const ElectronicSignatureSchema = require("../../schemas/ElectronicSignatureSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];
	router.get("/api/Electronic-Signature/Read", ElectronicSignature.Read(...instances));
	router.delete(
		"/api/Electronic-Signature/Erase",
		validate({ body: ElectronicSignatureSchema.erase }),
		ElectronicSignature.Erase(...instances)
	);
	router.post(
		"/api/Electronic-Signature/Create",
		validate({ body: ElectronicSignatureSchema.create }),
		ElectronicSignature.Create(...instances)
	);
	router.put(
		"/api/Electronic-Signature/Update",
		validate({ body: ElectronicSignatureSchema.update }),
		ElectronicSignature.Update(...instances)
	);

	app.use(router);
};
