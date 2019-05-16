const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Controller - Electronic_Wallet
const Electronic_Wallet = {};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Electronic_Wallet.Read = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_READ_ELECTRONIC_WALLET",
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
Electronic_Wallet.Delete = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      const query = "CALL SP_DELETE_ELECTRONIC_WALLET(?);";
      mysqlConnection.query(
        query,
        [req.body.electronic_wallet_id],
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
Electronic_Wallet.Create = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_ELECTRONIC_WALLET(?);",
        [req.body.marina_amount],
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
Electronic_Wallet.Update = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      const query = `    
      CALL SP_UPDATE_ELECTRONIC_WALLET (?,?);
    `;
      mysqlConnection.query(
        query,
        [req.body.electronic_wallet_id, req.body.marina_amount],
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

module.exports = Electronic_Wallet;
