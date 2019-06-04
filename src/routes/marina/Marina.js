// Routes
const Marina = require("../../controllers/marina/Marina");
const { MarinaSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	// Lee una cotización por ID.
	router.get("/api/marina/quotations/:id", validate({ params: MarinaSchema.read }), Marina.Read(...instances));
	// Lee todas las cotizaciones por grupo en una variable llamada "filterBy".
	router.get("/api/marina/quotations/", validate({ query: MarinaSchema.readList }), Marina.ReadList(...instances));
	// Crea cotización.
	router.post("/api/marina/quotations/", validate({ body: MarinaSchema.create }), Marina.Create(...instances));

	router.delete("/api/marina/quotations/erase", validate({ body: MarinaSchema.erase }), Marina.Erase(...instances));
	router.patch("/api/marina/quotations/delete", validate({ body: MarinaSchema.delete }), Marina.Delete(...instances));
	router.put("/api/marina/quotations/update", validate({ body: MarinaSchema.update }), Marina.Update(...instances));

	app.use(router);
};
