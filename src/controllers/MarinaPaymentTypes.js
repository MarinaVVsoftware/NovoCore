const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Controller - MarinaPayments
const MarinaPaymentType = {};

MarinaPaymentType.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_PAYMENT_TYPE", (err, rows, fields) => {
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

MarinaPaymentType.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_DELETE_PAYMENT_TYPE (?)", [ req.body.id ], (err, rows, fields) => {
				if (err) next(newError(err, 400));
				res.status(200).send({ status: "MARINA PAYMENT TYPE DELETED " });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaPaymentType.Create = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_CREATE_PAYMENT_TYPE (?)", [ req.body.name ], (err, rows, fields) => {
				if (err) next(newError(err, 400));
				res.status(200).send({ status: "MARINA PAYMENT TYPE CREATED" });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 400));
		}
	};
};

MarinaPaymentType.Update = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_UPDATE_PAYMENT_TYPE (?,?)",
				[ req.body.paymentTypeId, req.body.name ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA PAYMENT TYPE UPDATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 400));
		}
	};
};

module.exports = MarinaPaymentType;
