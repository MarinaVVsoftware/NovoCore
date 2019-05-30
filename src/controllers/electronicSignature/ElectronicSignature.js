const Log = require("../../helpers/Logs");

// Controller - ElectronicSignature
const ElectronicSignature = {};

ElectronicSignature.Read = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_READ_ELECTRONIC_SIGNATURES")
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

ElectronicSignature.Erase = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_DELETE_ELECTRONIC_SIGNATURES (?)", [ req.body.id ])
				.then((result) => {
					res.status(200).send({ status: "ELECTRONIC SIGNATURE DELETED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

ElectronicSignature.Create = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_CREATE_ELECTRONIC_SIGNATURES (?,?,?);", [
				req.body.signature,
				req.body.attemps,
				req.body.attempsResetDate
			])
				.then((result) => {
					res.status(200).send({ status: "ELECTRONIC SIGNATURE CREATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

ElectronicSignature.Update = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_UPDATE_ELECTRONIC_SIGNATURES (?,?,?,?)", [
				req.body.ElectronicSignatureId,
				req.body.signature,
				req.body.attemps,
				req.body.attempsResetDate
			])
				.then((result) => {
					res.status(200).send({ status: "ELECTRONIC SIGNATURE UPDATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = ElectronicSignature;
