// Controller - Clients
const Clients = {};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Clients.Read = function(newError, Query, mysqlConnection) {
  return (req, res, next) => {
    console.log("lo que sea");
    Query(mysqlConnection, "CALL SP_READ_CLIENTS(); ").then(result => {
      let clients = result[0][0];
      console.log(clients);
      let response = {};
      clients.map(client => {
        response[client.client_id] = { client };
      });

      res.status(200).send(response);
    });
  };
};

//Funcion para llamar La informacion de 1 usuario a travez de su Id

// Funcion para eliminar usuarios por su ID
Clients.Delete = function(newError, Query, mysqlConnection) {
  return function(req, res, next) {
    try {
      const query = "CALL SP_DELETE_CLIENTS(?);";
      mysqlConnection.query(
        query,
        [req.body.client_id],
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
Clients.Create = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_CLIENTS(?,?,?,?,?,?,?,?);",
        [
          req.body.status_id,
          req.body.rol_id,
          req.body.electronic_signature_id,
          req.body.name,
          req.body.email,
          req.body.phone,
          req.body.address,
          req.body.electronic_wallet_id
        ],
        (err, rows, fields) => {
          if (err) next("Mysql Error: " + err);
          else res.status(200).send({ status: "USER CREATED" });
        }
      );
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

//Funcion para Modificar Usuarios
Clients.Update = function(mysqlConnection) {
  return function(req, res, next) {
    try {
      const query = `    
        CALL SP_UPDATE_CLIENTS(?,?,?,?,?,?,?,?,?,?);
      `;
      mysqlConnection.query(
        query,
        [
          req.body.clients_id,
          req.body.status_id,
          req.body.rol_id,
          req.body.electronic_signature_id,
          req.body.name,
          req.body.email,
          req.body.phone,
          req.body.address,
          req.body.creation_date,
          req.body.electronic_wallet_id
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

module.exports = Clients;
