const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Marina - Controller
const MarinaDebts = {};

MarinaDebts.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_MARINA_DEBTS", (err, rows, fields) => {
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

MarinaDebts.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_DELETE_MARINA_DEBTS (?)", [ req.body.id ], (err, rows, fields) => {
				if (err) next(newError(err, 400));
				res.status(200).send({ status: "MARINA DEBT DELETED " });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaDebts.Create = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_CREATE_MARINA_DEBTS (?,?,?,?)",
				[ req.body.clientId, req.body.folio, req.body.amount, req.body.creationDate ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA DEBT CREATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaDebts.Update = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_UPDATE_MARINA_DEBTS (?,?,?,?,?)",
				[ req.body.marinaDebtId, req.body.clientId, req.body.folio, req.body.amount, req.body.creationDate ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "MARINA DEBT UPDATED " });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = MarinaDebts;
