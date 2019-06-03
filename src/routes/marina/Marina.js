// Routes
const Marina = require("../../controllers/marina/Marina");
const { MarinaSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/marina/quotations/:id", validate({ params: MarinaSchema.read }), Marina.Read(...instances));
	router.get("/api/marina/quotations/", validate({ query: MarinaSchema.readList }), Marina.ReadList(...instances));
	router.delete("/api/marina/quotations/erase", validate({ body: MarinaSchema.erase }), Marina.Erase(...instances));
	router.patch("/api/marina/quotations/delete", validate({ body: MarinaSchema.delete }), Marina.Delete(...instances));
	router.post("/api/marina/quotations/create", validate({ body: MarinaSchema.create }), Marina.Create(...instances));
	router.put("/api/marina/quotations/update", validate({ body: MarinaSchema.update }), Marina.Update(...instances));

	app.use(router);
};
