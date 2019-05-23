const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_READ_SOCIAL_REASON",
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          rows.pop();
          res.status(200).send(JSON.stringify(rows));
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Erase the record (DELETE)
Marina.Erase = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_DELETE_SOCIAL_REASON (?);",
        [req.body.id],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "SOCIAL REASON DELETED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Update the state
Marina.Delete = mysqlConnection => {
  return (req, res, next) => {
    if (!req.body.id || req.body.delete === null)
      res.status(400).send({ error: "Undefined Object" });
    try {
      mysqlConnection.query(
        "CALL SP_LOGICAL_DELETE_SOCIAL_REASON (?,?);",
        [req.body.id, req.body.delete],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "Success" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Create a new record
Marina.Create = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_SOCIAL_REASON (?,?,?,?,?,?,?)",
        [
          req.body.client_id,
          req.body.email,
          req.body.social_reason,
          req.body.RCD,
          req.body.CFDI,
          req.body.address,
          req.body.status_id
        ],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "Success" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Update a record
Marina.Update = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_UPDATE_SOCIAL_REASON (?,?,?,?,?,?,?,?)",
        [
          req.body.id,
          req.body.client_id,
          req.body.email,
          req.body.social_reason,
          req.body.RCD,
          req.body.CFDI,
          req.body.address,
          req.body.status_id
        ],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "SOCIAL REASON UPDATED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Marina;
