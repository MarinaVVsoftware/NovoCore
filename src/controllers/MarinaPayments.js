const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Controller - MarinaPayments
const MarinaPayments = {};

MarinaPayments.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_MARINA_PAYMENT", (err, rows, fields) => {
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

MarinaPayments.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_DELETE_MARINA_PAYMENT (?)", [ req.body.id ], (err, rows, fields) => {
				if (err) next(newError(err, 400));
				res.status(200).send({ status: "MARINA PAYMENT DELETED " });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaPayments.Create = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_CREATE_MARINA_PAYMENT (?,?,?,?,?,?,?,?)",
				[
					req.body.paymentTypeId,
					req.body.clientId,
					req.body.folio,
					req.body.currency,
					req.body.currencyDate,
					req.body.paymentReceived,
					req.body.convertedAmount,
					req.body.creationDate
				],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA PAYMENT CREATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaPayments.Update = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_UPDATE_MARINA_PAYMENT (?,?,?,?,?,?,?,?,?)",
				[
					req.body.marinaPaymentId,
					req.body.paymentTypeId,
					req.body.clientId,
					req.body.folio,
					req.body.currency,
					req.body.currencyDate,
					req.body.paymentReceived,
					req.body.convertedAmount,
					req.body.creationDate
				],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA PAYMENT UPDATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = MarinaPayments;
