// Routes
const Marina = require("../../controllers/marina/MarinaQuotations");
const { MarinaSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	// Lee una cotización por ID.
	router.get("/api/marina/quotations/:id", validate({ params: MarinaSchema.read }), Marina.Read(...instances));
	// Lee todas las cotizaciones por grupo en una variable llamada "filterBy".
	router.get("/api/marina/quotations/", validate({ query: MarinaSchema.readList }), Marina.ReadList(...instances));
	// Crea cotización.
	router.post("/api/marina/quotations/", validate({ body: MarinaSchema.create }), Marina.Create(...instances));

	// Actualiza la cotización a estado "sent"
	router.patch("/api/marina/quotations/:id/sent/", validate({}), Marina.StatusSent(...instances));

	app.use(router);
};
