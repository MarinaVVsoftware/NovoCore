const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_MARINA_QUOTATION", (err, rows, fields) => {
				rows.pop();
				if (err) throw "Mysql Error";
				res.status(200).send(JSON.stringify(rows));
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

Marina.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		if (!req.body.id) res.status(400).send({ error: "Undefined Object" });
		try {
			mysqlConnection.query("CALL SP_DELETE_MARINA_QUOTATION (?);", [ req.body.id ], (err, rows, fields) => {
				if (err) throw "Mysql Error";
				res.json({ status: "QUOTATION DELETED" });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

Marina.Delete = (mysqlConnection) => {
	return (req, res, next) => {
		if (!req.body.id || req.body.delete === null) res.status(400).send({ error: "Undefined Object" });
		try {
			mysqlConnection.query(
				"CALL SP_LOGICAL_DELETED_MARINA_QUOTATION (?,?);",
				[ req.body.id, req.body.delete ],
				(err, rows, fields) => {
					if (err) throw "Mysql Error";
					res.json({ status: "Success" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

Marina.Create = (mysqlConnection) => {
	return (req, res, next) => {
		if (
			!req.body.boatId ||
			!req.body.quotationStatusId ||
			!req.body.mooringRateId ||
			!req.body.arrivalDate ||
			!req.body.departureDate ||
			req.body.arrivalStatus === null ||
			!req.body.daysStay ||
			!req.body.discountStay ||
			!req.body.tax ||
			!req.body.total ||
			!req.body.subtotal
		) {
			res.status(400).send({ error: "Undefined Object" });
		}

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
					if (err) throw "Mysql Error";
					res.json({ status: "Success" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

Marina.Update = (mysqlConnection) => {
	return (req, res) => {
		if (
			!req.body.quotationId ||
			!req.body.boatId ||
			!req.body.quotationStatusId ||
			!req.body.mooringRateId ||
			!req.body.arrivalDate ||
			!req.body.departureDate ||
			req.body.arrivalStatus === null ||
			!req.body.daysStay ||
			!req.body.discountStay ||
			!req.body.tax ||
			!req.body.total ||
			!req.body.subtotal
		) {
			res.status(400).send({ error: "Undefined Object" });
		}

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
					if (err) throw "Mysql Error";
					res.json({ status: "QUOTATION UPDATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = Marina;
