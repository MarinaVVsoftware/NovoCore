// Routes
const MarinaServices = require("../../controllers/marina/MarinaServices");
const { MarinaServicesSchema } = require("../../schemas/MarinaSchema");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ newError, Query, mysqlConnection ];

	router.get("/api/Marina-Service/Read", MarinaServices.Read(...instances));
	router.delete(
		"/api/Marina-Service/Erase",
		validate({ body: MarinaServicesSchema.erase }),
		MarinaServices.Erase(...instances)
	);
	router.post(
		"/api/Marina-Service/Create",
		validate({ body: MarinaServicesSchema.create }),
		MarinaServices.Create(...instances)
	);
	router.put(
		"/api/Marina-Service/Update",
		validate({ body: MarinaServicesSchema.update }),
		MarinaServices.Update(...instances)
	);

	app.use(router);
};
