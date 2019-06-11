// Routes
const path = require("path");
const MarinaQuotations = require(path.resolve(__dirname, "../../controllers/marina/MarinaQuotations"));
const Schema = require(path.resolve(__dirname, "../../schemas/marina/MarinaQuotations"));

module.exports = (app, router, newError, Query, validate, mysqlConnection, multer, dropbox, redis, redisHandler) => {
	const instances = [ newError, Query, mysqlConnection ];

	// Lee una cotización por ID.
	router.get("/api/marina/quotations/:id", validate({ params: Schema.read }), MarinaQuotations.Read(...instances));
	// Lee todas las cotizaciones por grupo en una variable llamada "filterBy".
	router.get(
		"/api/marina/quotations/",
		validate({ query: Schema.readList }),
		MarinaQuotations.ReadList(...instances)
	);
	// Crea cotización.
	router.post(
		"/api/marina/quotations/",
		//validate({ body: Schema.create }),
		MarinaQuotations.Create(...instances)
	);

	// Actualiza la cotización a estado "sent"
	router.patch("/api/marina/quotations/:id/sent/", validate({}), MarinaQuotations.StatusSent(...instances));

	app.use(router);
};
