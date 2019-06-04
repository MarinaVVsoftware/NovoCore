const Log = require("../../helpers/Logs");
const newError = require("../../helpers/newError");

// Controller - MarinaServices
const MarinaServices = {};

MarinaServices.Read = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_READ_MARINA_SERVICE")
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

MarinaServices.Erase = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_DELETE_MARINA_SERVICE (?)", [ req.body.id ])
				.then((result) => {
					res.status(200).send({ status: "MARINA SERVICE DELETED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaServices.Create = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_CREATE_MARINA_SERVICE (?,?);", [ req.body.name, req.body.price ])
				.then((result) => {
					res.status(200).send({ status: "MARINA SERVICE CREATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

MarinaServices.Update = (newError, Query, mysqlConnection) => {
	return (req, res, next) => {
		try {
			Query(mysqlConnection, "CALL SP_UPDATE_MARINA_SERVICE (?,?,?)", [
				req.body.marinaServiceId,
				req.body.name,
				req.body.price
			])
				.then((result) => {
					res.status(200).send({ status: "MARINA SERVICE UPDATED" });
				})
				.catch((error) => next(error));
		} catch (error) {
			console.log(error);
			next(newError(error, 500));
		}
	};
};

module.exports = MarinaServices;
