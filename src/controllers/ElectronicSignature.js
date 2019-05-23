const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Controller - ElectronicSignature
const ElectronicSignature = {};

ElectronicSignature.Read = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_READ_ELECTRONIC_SIGNATURES", (err, rows, fields) => {
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

ElectronicSignature.Erase = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query("CALL SP_DELETE_ELECTRONIC_SIGNATURES (?)", [ req.body.id ], (err, rows, fields) => {
				if (err) next(newError(err, 400));
				res.status(200).send({ status: "ELECTRONIC SIGNATURE DELETED" });
			});
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

ElectronicSignature.Create = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_CREATE_ELECTRONIC_SIGNATURES (?,?,?);",
				[ req.body.signature, req.body.attemps, req.body.attempsResetDate ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "ELECTRONIC SIGNATURE CREATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

ElectronicSignature.Update = (mysqlConnection) => {
	return (req, res, next) => {
		try {
			mysqlConnection.query(
				"CALL SP_UPDATE_ELECTRONIC_SIGNATURES (?,?,?,?)",
				[ req.body.ElectronicSignatureId, req.body.signature, req.body.attemps, req.body.attempsResetDate ],
				(err, rows, fields) => {
					if (err) next(newError(err, 400));
					res.status(200).send({ status: "ELECTRONIC SIGNATURE UPDATED" });
				}
			);
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = ElectronicSignature;
