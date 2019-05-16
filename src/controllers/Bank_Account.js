const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Controller - Bank_Account
const Bank_Account = {};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Bank_Account.Read = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_READ_BANK_ACCOUNT",
        (err, rows, fields) => {
          if (err) throw "Mysql Error";
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

// Funcion para eliminar usuarios por su ID
Bank_Account.Delete = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      const query = "CALL SP_DELETE_BANK_ACCOUNT(?);";
      mysqlConnection.query(
        query,
        [req.body.Bank_Account_id],
        (err, rows, fields) => {
          if (err) throw "Mysql Error";
          res.status(200).send({ status: "USER DELETED" });
        }
      );
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

//Funcion para Insertar Usuarios dentro de la Tabla
Bank_Account.Create = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_BANK_ACCOUNT(?,?,?,?,?);",
        [
          req.body.client_id,
          req.body.alias,
          req.body.bank,
          req.body.name,
          req.body.account_number,
          req.body.cable,
          req.body.status_id
        ],
        (err, rows, fields) => {
          if (err) throw "Mysql Error";
          res.status(200).send({ status: "USER CREATED" });
        }
      );
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

//Funcion para Modificar Usuarios
Bank_Account.Update = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      const query = `    
      CALL SP_UPDATE_BANK_ACCOUNT (?,?,?,?,?,?,?);
    `;
      mysqlConnection.query(
        query,
        [
          req.body.Bank_Account_id,
          req.body.client_id,
          req.body.alias,
          req.body.bank,
          req.body.name,
          req.body.account_number,
          req.body.clabe,
          req.body.status_id
        ],
        (err, rows, fields) => {
          if (err) throw "Mysql Error";
          res.status(200).send({ status: "USER UPDATED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Bank_Account;
