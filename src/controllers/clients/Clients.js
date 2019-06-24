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

Clients.PostClient = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Clients_PostClient(?,?,?,?,?);", [
        req.body.status_id,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address
      ])
        .then(() => {
          res.status(200).send({ status: "cliente creado." });
        })
        .catch(error => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

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
