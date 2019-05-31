const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Electronic_Wallet - Controller
const Electronic_Wallet = {};

// Read all the Electronic_Wallet Quotation
Electronic_Wallet.Read = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_READ_ELECTRONIC_WALLET",
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
Electronic_Wallet.Erase = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_DELETE_ELECTRONIC_WALLET (?);",
        [req.body.electronic_wallet_id],
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

// Update the state
Electronic_Wallet.Delete = mysqlConnection => {
  return (req, res, next) => {
    if (!req.body.id || req.body.delete === null)
      res.status(400).send({ error: "Undefined Object" });
    try {
      mysqlConnection.query(
        "CALL SP_LOGICAL_DELETED_ELECTRONIC_WALLET (?,?);",
        [req.body.electronic_wallet_id, req.body.logical_deleted],
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
Electronic_Wallet.Create = mysqlConnection => {
  return (req, res, next) => {
    try {
      var ld = 0;
      mysqlConnection.query(
        "CALL SP_CREATE_ELECTRONIC_WALLET (?,?)",
        [req.body.Electronic_Wallet_amount, ld],
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
Electronic_Wallet.Update = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_UPDATE_ELECTRONIC_WALLET (?,?,?)",
        [
          req.body.electronic_wallet_id,
          req.body.Electronic_Wallet_amount,
          req.body.logical_deleted
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

module.exports = Electronic_Wallet;
