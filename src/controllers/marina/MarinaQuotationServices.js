// Controller - Marina Quotation Services
const MarinaQuotationServices = {};

MarinaQuotationServices.Read = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_MARINA_QUOTATION_SERVICE")
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

MarinaQuotationServices.Erase = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_DELETE_MARINA_QUOTATION_SERVICE (?)", [
        req.body.id
      ])
        .then(result => {
          res.status(200).send({ status: "MARINA QUOTATION SERVICE DELETED " });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaQuotationServices.Delete = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query("CALL SP_LOGICAL_DELETED_MARINA_QUOTATION_SERVICE (?,?)", [
        req.body.marinaQuotationServiceId,
        req.body.delete
      ])
        .then(result => {
          res.status(200).send({ status: "MARINA QUOTATION SERVICE DELETED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

MarinaQuotationServices.Create = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query("CALL SP_CREATE_MARINA_QUOTATION_SERVICE (?,?,?,?,?,?,?,?)", [
        req.body.boatId,
        req.body.marinaServiceId,
        req.body.done,
        req.body.tax,
        req.body.total,
        req.body.subtotal,
        req.body.quantity,
        req.body.creationDate
      ])
        .then(result => {
          res.status(200).send({ status: "MARINA QUOTATION SERVICE CREATED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 400));
    }
  };
};

MarinaQuotationServices.Update = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      mysqlConnection
        .query(
          "CALL SP_UPDATE_MARINA_QUOTATION_SERVICE (?,?,?,?,?,?,?,?,?,?)",
          [
            req.body.marinaQuotationServiceId,
            req.body.boatId,
            req.body.marinaServiceId,
            req.body.done,
            req.body.tax,
            req.body.total,
            req.body.subtotal,
            req.body.quantity,
            req.body.creationDate
          ]
        )
        .then(result => {
          res.status(200).send({ status: "MARINA QUOTATION SERVICE UPDATED" });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 400));
    }
  };
};

module.exports = MarinaQuotationServices;
