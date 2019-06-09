// Marina - Controller
const MarinaDebts = {};

MarinaDebts.Read = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_MARINA_DEBTS")
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

MarinaDebts.Erase = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_DELETE_MARINA_DEBTS (?)", [req.body.id])
        .then(result => {
          res.status(200).send({ status: "MARINA DEBT DELETED " });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaDebts.Create = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_CREATE_MARINA_DEBTS (?,?,?,?)", [
        req.body.clientId,
        req.body.folio,
        req.body.amount,
        req.body.creationDate
      ])
        .then(result => {
          res.status(200).send({ status: "MARINA DEBT CREATED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaDebts.Update = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_UPDATE_MARINA_DEBTS (?,?,?,?,?)", [
        req.body.marinaDebtId,
        req.body.clientId,
        req.body.folio,
        req.body.amount,
        req.body.creationDate
      ])
        .then(result => {
          res.status(200).send({ status: "MARINA DEBT UPDATED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaDebts;
