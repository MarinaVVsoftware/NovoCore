// Routes
const Marina = require("../../controllers/marina/Marina");
const { MarinaSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/Marina/Read", Marina.Read(...instances));
	router.get(
		"/api/Marina/ReadList/:filterBy",
		validate({ params: MarinaSchema.readList }),
		Marina.ReadList(...instances)
	);
	router.delete("/api/Marina/Erase", validate({ body: MarinaSchema.erase }), Marina.Erase(...instances));
	router.patch("/api/Marina/Delete", validate({ body: MarinaSchema.delete }), Marina.Delete(...instances));
	router.post("/api/Marina/Create", validate({ body: MarinaSchema.create }), Marina.Create(...instances));
	router.put("/api/Marina/Update", validate({ body: MarinaSchema.update }), Marina.Update(...instances));

	app.use(router);
};
