const path = require("path");
const newError = require(path.resolve(__dirname, "../../helpers/NewError"));

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = mysqlConnection => {
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
Marina.Erase = mysqlConnection => {
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

// Update the state
// Marina.Delete = mysqlConnection => {
//   return (req, res, next) => {
//     if (!req.body.id || req.body.delete === null)
//       res.status(400).send({ error: "Undefined Object" });
//     try {
//       mysqlConnection.query(
//         "CALL SP_LOGICAL_DELETED_ELECTRONIC_WALLET (?,?);",
//         [
//           req.body.electronic_wallet_id,
//           req.body.marina_amount,
//           req.body.logical_deleted
//         ],
//         (err, rows, fields) => {
//           if (err) next(newError(err, 400));
//           res.status(200).send({ status: "Success" });
//         }
//       );
//     } catch (error) {
//       console.log(error);
//       next(newError(error, 500));
//     }
//   };
// };

// Create a new record
Marina.Create = mysqlConnection => {
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
Marina.Update = mysqlConnection => {
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

module.exports = Marina;
