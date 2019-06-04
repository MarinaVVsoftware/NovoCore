const Log = require("../../helpers/Logs");

// Controller - MarinaPayments
const MarinaPaymentType = {};

MarinaPaymentType.Read = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_READ_PAYMENT_TYPE")
				.then(([ rows, fields ]) => {
					rows.pop();
					res.status(200).send(JSON.stringify(rows[0]));
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaPaymentType.Erase = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query("CALL SP_DELETE_PAYMENT_TYPE (?)", [ req.body.id ])
				.then((result) => {
					res.status(200).send({ status: "MARINA PAYMENT TYPE DELETED " });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaPaymentType.Create = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query("CALL SP_CREATE_PAYMENT_TYPE (?)", [ req.body.name ])
				.then((result) => {
					res.status(200).send({ status: "MARINA PAYMENT TYPE CREATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 400));
		}
	};
};

MarinaPaymentType.Update = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query("CALL SP_UPDATE_PAYMENT_TYPE (?,?)", [ req.body.paymentTypeId, req.body.name ])
				.then((result) => {
					res.status(200).send({ status: "MARINA PAYMENT TYPE UPDATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 400));
		}
	};
};

module.exports = MarinaPaymentType;
