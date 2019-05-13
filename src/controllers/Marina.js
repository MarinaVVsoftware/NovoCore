const Log = require('../helpers/Logs');

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = (mysqlConnection) => {
	return (req, res) => {
		try {
			mysqlConnection.query('CALL SP_READ_MARINA_QUOTATION', (err, rows, fields) => {
				rows.pop();
				if (!err) {
					res.status(200).send(JSON.stringify(rows));
				} else {
					console.log(err);
					res.status(400).send(JSON.stringify(err));
				}
			});
		} catch (error) {
			console.log(error);
			res.status(400).send(error);
		}
	};
};

Marina.Erase = (mysqlConnection) => {
	return (req, res) => {
		if (!req.body.id) res.status(400).send({ error: 'Undefined Object' });
		try {
			mysqlConnection.query('CALL SP_DELETE_MARINA_QUOTATION (?);', [ req.body.id ], (err, rows, fields) => {
				if (!err) {
					res.json({ status: 'QUOTATION DELETED' });
				} else {
					console.log(err);
				}
			});
		} catch (error) {
			console.log(error);
			res.status(400).send(error);
		}
	};
};

Marina.Delete = (mysqlConnection) => {
	return (req, res) => {
		if (!req.body.id || req.body.delete === null) res.status(400).send({ error: 'Undefined Object' });
		try {
			mysqlConnection.query(
				'CALL SP_LOGICAL_DELETED_MARINA_QUOTATION (?,?);',
				[ req.body.id, req.body.delete ],
				(err, rows, fields) => {
					if (!err) {
						res.json({ status: 'Success' });
					} else {
						console.log(err);
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(400).send(error);
		}
	};
};

Marina.Create = (mysqlConnection) => {
	return (req, res) => {
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
			res.status(400).send({ error: 'Undefined Object' });
		}

		try {
			mysqlConnection.query(
				'CALL SP_CREATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?)',
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
					if (!err) {
						res.json({ status: 'Success' });
					} else {
						console.log(err);
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(400).send(error);
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
			res.status(400).send({ error: 'Undefined Object' });
		}

		try {
			mysqlConnection.query(
				'CALL SP_UPDATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?,?)',
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
					if (!err) {
						res.json({ status: 'QUOTATION UPDATED' });
					} else {
						console.log(err);
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(400).send(error);
		}
	};
};

module.exports = Marina;
