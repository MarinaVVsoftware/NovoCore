const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Electronic_Wallet_Historic - Controller
const Electronic_Wallet_Historic = {};

// Read all the Electronic_Wallet_Historic Quotation
Electronic_Wallet_Historic.Read = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_READ_ELECTRONIC_WALLET_HISTORIC",
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
Electronic_Wallet_Historic.Erase = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_DELETE_ELECTRONIC_WALLET_HISTORIC (?);",
        [req.body.electronic_W_H_id],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "QUOTATION DELETED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Create a new record
Electronic_Wallet_Historic.Create = mysqlConnection => {
  return (req, res, next) => {
    try {
      var ld = 0;
      mysqlConnection.query(
        "CALL SP_CREATE_ELECTRONIC_WALLET_HISTORIC (?,?,?,?,?,?)",
        [
          req.body.client_id,
          req.body.creation_date,
          req.body.alter_responsable,
          req.body.descripcion,
          req.body.previous_amount,
          req.body.new_amount
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
Electronic_Wallet_Historic.Update = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_UPDATE_ELECTRONIC_WALLET (?,?,?)",
        [
          req.body.electronic_W_H_id,
          req.body.client_id,
          req.body.creation_date,
          req.body.alter_responsable,
          req.body.descripcion,
          req.body.previous_amount,
          req.body.new_amount
        ],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "QUOTATION UPDATED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Electronic_Wallet_Historic;
