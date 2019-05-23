// Routes
const ElectronicSignature = require("../controllers/ElectronicSignature");
const ElectronicSignatureSchema = require("../schemas/ElectronicSignatureSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Electronic-Signature/Read", ElectronicSignature.Read(mysqlConnection));
	router.delete(
		"/api/Electronic-Signature/Erase",
		validate({ body: ElectronicSignatureSchema.erase }),
		ElectronicSignature.Erase(mysqlConnection)
	);
	router.post(
		"/api/Electronic-Signature/Create",
		validate({ body: ElectronicSignatureSchema.create }),
		ElectronicSignature.Create(mysqlConnection)
	);
	router.put(
		"/api/Electronic-Signature/Update",
		validate({ body: ElectronicSignatureSchema.update }),
		ElectronicSignature.Update(mysqlConnection)
	);

	app.use(router);
};
