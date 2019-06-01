const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");
const Query = require("../helpers/query");

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_MARINA_QUOTATION", (err, rows, fields) => {
				if (err) next(newError(err, 400));
				rows.pop();
				res.status(200).send(JSON.stringify(rows));
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Erase the record (DELETE)
Marina.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_DELETE_MARINA_QUOTATION (?);", [ req.body.id ], (err, rows, fields) => {
				if (err) next(newError(err, 400));
				res.status(200).send({ status: "QUOTATION DELETED" });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Update the state
Marina.Delete = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_LOGICAL_DELETED_MARINA_QUOTATION (?,?);",
				[ req.body.id, req.body.delete ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "Success" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Create a new record
Marina.Create = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_CREATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?)",
				[
					req.body.boatId,
					req.body.quotationStatusId,
					req.body.mooringRateId,
					req.body.arrivalDate,
					req.body.departureDate,
					req.body.arrivalStatus,
					req.body.daysStay,
					req.body.discountStay,
					req.body.tax,
					req.body.total,
					req.body.subtotal
				],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "Success" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Update a record
Marina.Update = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_UPDATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?,?)",
				[
					req.body.quotationId,
					req.body.boatId,
					req.body.quotationStatusId,
					req.body.mooringRateId,
					req.body.arrivalDate,
					req.body.departureDate,
					req.body.arrivalStatus,
					req.body.daysStay,
					req.body.discountStay,
					req.body.tax,
					req.body.total,
					req.body.subtotal
				],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "QUOTATION UPDATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Si se cicla, quiza no se ha puesto el res.status.send
// Promises.all, el resultado de cada promesa es una row.
Marina.ReadList = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			// Objeto para seleccionar el grupo de cotizaciones a base de su status
			const quotationStatus = {
				active: [ 2, 3, 4, 5, 6 ],
				draft: [ 1 ],
				cancelled: [ 8 ],
				deleted: [ 9 ],
				finished: [ 7 ]
			};

			const statusSelected = quotationStatus.hasOwnProperty(req.params.filterBy)
				? quotationStatus[req.params.filterBy]
				: quotationStatus[active];

			// Convierte el array a string delimitado por comas para la base de datos.
			Query(mysqlConnection, "CALL SP_READ_MARINA_QUOTATIONS_LIST (?)", [ statusSelected.toString() ])
				.then(([ rows, fields ]) => {
					const quotations = [];
					const Promises = [];
					const data = [];

					// Se ejecuta UNA promesa y se hace un push a las nuevas promesas para la electricidad.
					rows[0].forEach((element, index) => {
						Promises.push(
							Query(mysqlConnection, "CALL SP_READ_BOAT_ELECTRICITY_BY_BOAT (?)", [ element.boat_id ])
						);
						quotations.push(element);
					});

					// Se ejecuta las promesas sincronas y se crea un objeto nuevo por cada iteración.
					Promise.all(Promises)
						.then((result) => {
							result.forEach((element, index) => {
								data.push(Object.assign({}, quotations[index], { electricity: element[0][0] }));
							});
							res.status(200).send(data);
						})
						.catch((error) => next(error));
				})
				.catch((error) => {
					next(error);
				});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = Marina;
