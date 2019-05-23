const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Controller - Marina Quotation Services
const MarinaQuotationServices = {};

MarinaQuotationServices.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_MARINA_QUOTATION_SERVICE", (err, rows, fields) => {
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

MarinaQuotationServices.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_DELETE_MARINA_QUOTATION_SERVICE (?)",
				[ req.body.id ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA QUOTATION SERVICE DELETED " });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaQuotationServices.Delete = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_LOGICAL_DELETED_MARINA_QUOTATION_SERVICE (?,?)",
				[ req.body.marinaQuotationServiceId, req.body.delete ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA QUOTATION SERVICE DELETED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaQuotationServices.Create = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_CREATE_MARINA_QUOTATION_SERVICE (?,?,?,?,?,?,?,?)",
				[
					req.body.boatId,
					req.body.marinaServiceId,
					req.body.done,
					req.body.tax,
					req.body.total,
					req.body.subtotal,
					req.body.quantity,
					req.body.creationDate
				],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA QUOTATION SERVICE CREATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 400));
		}
	};
};

MarinaQuotationServices.Update = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_UPDATE_MARINA_QUOTATION_SERVICE (?,?,?,?,?,?,?,?,?,?)",
				[
					req.body.marinaQuotationServiceId,
					req.body.boatId,
					req.body.marinaServiceId,
					req.body.done,
					req.body.tax,
					req.body.total,
					req.body.subtotal,
					req.body.quantity,
					req.body.creationDate
				],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA QUOTATION SERVICE UPDATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 400));
		}
	};
};

module.exports = MarinaQuotationServices;
