// Routes
const Marina = require("../controllers/Marina");
const MarinaSchema = require("../schemas/MarinaSchema");
const newError = require("../helpers/newError");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina/Read", Marina.Read(mysqlConnection));
	router.delete("/api/Marina/Erase", validate({ body: MarinaSchema.erase }), Marina.Erase(mysqlConnection));
	router.patch("/api/Marina/Delete", Marina.Delete(mysqlConnection));
	router.post("/api/Marina/Create", Marina.Create(mysqlConnection));
	router.put("/api/Marina/Update", Marina.Update(mysqlConnection));

	app.use(router);
};
