// Routes
const Marina = require("../controllers/Marina");
const { MarinaSchema } = require("../schemas/MarinaSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
	router.get("/api/Marina/Read", Marina.Read(mysqlConnection));
	router.get("/api/Marina/ReadList", validate({ body: MarinaSchema.readList }), Marina.ReadList(mysqlConnection));
	router.delete("/api/Marina/Erase", validate({ body: MarinaSchema.erase }), Marina.Erase(mysqlConnection));
	router.patch("/api/Marina/Delete", validate({ body: MarinaSchema.delete }), Marina.Delete(mysqlConnection));
	router.post("/api/Marina/Create", validate({ body: MarinaSchema.create }), Marina.Create(mysqlConnection));
	router.put("/api/Marina/Update", validate({ body: MarinaSchema.update }), Marina.Update(mysqlConnection));

	app.use(router);
};
