/** Middleware: Error Handler
 * Middleware para manejo de errores. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.z
 */
module.exports = (app) => {
	app.use((err, req, res, next) => {
		/* En caso que sea un error en el body del endpoint */
		if (err.validationErrors) {
			const error = err.validationErrors.body.map((element) => {
				return {
					datapath: element.dataPath,
					type: element.params.type,
					message: element.message
				};
			});
			res.status(400).send({ error });
		}

		/* En caso que se ejecute un NewError() */
		if (err.statusCode && err.message) {
			res.status(err.statusCode).send(err.message);
		} else {
			/* En caso que no se especifique el error */
			res.status(400).send("Something Went Wrong!");
		}
	});
};
