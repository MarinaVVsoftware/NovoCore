const path = require("path");
const newError = require(path.resolve(__dirname, "../../helpers/newError"));

// Bank_Account - Controller
const Bank_Account = {};

// Read all the Bank_Account Quotation
Bank_Account.Read = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_READ_BANK_ACCOUNT",
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
Bank_Account.Erase = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_DELETE_BANK_ACCOUNT (?);",
        [req.body.id],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "QUOTATION DELETED" });
        }
      );
      88;
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Update the state
Bank_Account.Delete = mysqlConnection => {
  return (req, res, next) => {
    if (!req.body.id || req.body.delete === null)
      res.status(400).send({ error: "Undefined Object" });
    try {
      mysqlConnection.query(
        "CALL SP_LOGICAL_DELETED_BANK_ACCOUNT (?);",
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
Bank_Account.Create = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_BANK_ACCOUNT (?,?,?,?,?)",
        [
          req.body.client_id,
          req.body.alias,
          req.body.bank,
          req.body.account_number,
          req.body.clabe,
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
Bank_Account.Update = mysqlConnection => {
  return (req, res, next) => {
    try {
      mysqlConnection.query(
        "CALL SP_UPDATE_BANK_ACCOUNT (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.bank_account_id,
          req.body.client_id,
          req.body.alias,
          req.body.bank,
          req.body.account_number,
          req.body.clabe,
          req.body.status_id
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

module.exports = Bank_Account;
