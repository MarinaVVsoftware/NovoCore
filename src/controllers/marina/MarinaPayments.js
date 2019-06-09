// Controller - MarinaPayments
const MarinaPayments = {};

MarinaPayments.Read = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_MARINA_PAYMENT")
        .then(([rows, fields]) => {
          rows.pop();
          res.status(200).send(JSON.stringify(rows[0]));
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaPayments.Erase = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_DELETE_MARINA_PAYMENT (?)", [req.body.id])
        .then(result => {
          res.status(200).send({ status: "MARINA PAYMENT DELETED " });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaPayments.Create = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(
        mysqlConnection,
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
        ]
      )
        .then(result => {
          res.status(200).send({ status: "MARINA PAYMENT CREATED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaPayments.Update = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(
        mysqlConnection,
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
        ]
      )
        .then(result => {
          res.status(200).send({ status: "MARINA PAYMENT UPDATED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaPayments;
