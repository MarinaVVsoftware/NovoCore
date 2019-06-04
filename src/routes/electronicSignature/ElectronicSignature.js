// Routes
const ElectronicSignature = require("../../controllers/electronicSignature/ElectronicSignature");
const ElectronicSignatureSchema = require("../../schemas/ElectronicSignatureSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];
	router.get("/api/electronic-signature/read", ElectronicSignature.Read(...instances));
	router.delete(
		"/api/electronic-signature/erase",
		validate({ body: ElectronicSignatureSchema.erase }),
		ElectronicSignature.Erase(...instances)
	);
	router.post(
		"/api/electronic-signature/create",
		validate({ body: ElectronicSignatureSchema.create }),
		ElectronicSignature.Create(...instances)
	);
	router.put(
		"/api/electronic-signature/update",
		validate({ body: ElectronicSignatureSchema.update }),
		ElectronicSignature.Update(...instances)
	);

	app.use(router);
};
