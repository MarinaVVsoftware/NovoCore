const Log = require("../../helpers/Logs");
const SendMail = require("../../helpers/SendMail");

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_READ_MARINA_QUOTATION (?);", [ req.params.id ])
				.then(([ rows, fields ]) => {
					rows.pop();
					res.status(200).send(rows[0]);
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Create a new record
Marina.Create = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(
				mysqlConnection,
				"CALL SP_CREATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
				[
					req.body.boatId,
					req.body.quotationStatusId,
					req.body.mooringTariffId,
					req.body.arrivalDate,
					req.body.departureDate,
					req.body.arrivalStatus,
					req.body.mooringTariff,
					req.body.loa,
					req.body.daysStay,
					req.body.discountStayPercentage,
					req.body.currencyAmount,
					req.body.tax,
					req.body.subtotal,
					req.body.total,
					req.body.monthlyQuotation,
					req.body.annualQuotation,
					req.body.semiannualQuotation,
					req.body.creationResponsable,

					/* Electricity */
					req.body.electricityTariff,
					req.body.totalElectricityDays,
					req.body.discountElectricityPercentage,
					req.body.currencyElectricityAmount,
					req.body.electricityTax,
					req.body.electricitySubtotal,
					req.body.electricityTotal
				]
			)
				.then((result) => {
					res.status(200).send({ status: "QUOTATION CREATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Si se cicla, quiza no se ha puesto el res.status.send Promises.all, el resultado de cada promesa es una row.
Marina.ReadList = (newError, Query, mysqlConnection) => {
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

			const statusSelected = quotationStatus.hasOwnProperty(req.query.filterBy)
				? quotationStatus[req.query.filterBy]
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
							Query(mysqlConnection, "CALL SP_BoatElectricity_GetByBoat (?,?)", [
								element.client_id,
								element.boat_name
							])
						);
						quotations.push(element);
					});

					// Se ejecuta las promesas sincronas y se crea un objeto nuevo por cada iteración.
					Promise.all(Promises)
						.then((result) => {
							result.forEach((element, index) => {
								data.push(
									Object.assign({}, quotations[index], {
										electricity: element[0][0]
									})
								);
							});
							res.status(200).send(data);
						})
						.catch((error) => next(error));
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

// Redireccionamiento de /api/marina/quotation/active
Marina.GetDefault = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			res.redirect("active");
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

Marina.StatusSent = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		/* INCLUIR LA OPCIOND DE ENVIAR CORREO. */
		try {
			Query(mysqlConnection, "CALL SP_UPDATE_MARINA_QUOTATION_STATUS (?,?);", [ req.params.id, 9 ])
				.then((result) => {
					SendMail("manu.gtzp@gmail.com", "test", "test", "<h1>test</h1>")
						.then((result) => {
							res.status(200).send({ status: "QUOTATION UPDATED TO STATUS SENT." });
						})
						.catch((error) => next(error));
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = Marina;
