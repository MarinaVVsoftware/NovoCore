// Controller - Clients
const Clients = {};

Clients.GetClientById = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de id */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      Query(mysqlConnection, "CALL SP_Clients_GetClientById(?);", [
        req.params.id
      ])
        .then(result => {
          res.status(200).send({ client: result[0][0][0] });
        })
        .catch(error => {
          next(newError(error, 400));
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Clients.GetClients = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Clients_GetClients();")
        .then(result => {
          res.status(200).send({ clients: result[0][0] });
        })
        .catch(error => {
          next(newError(error, 400));
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
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
          res.status(200).send({ status: "Cliente creado." });
        })
        .catch(error => {
          next(newError(error, 400));
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Clients.PutClient = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de id */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      Query(mysqlConnection, "CALL SP_Clients_PutClient(?,?,?,?,?,?);", [
        req.params.id,
        req.body.status_id,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address
      ])
        .then(() => {
          res.status(200).send({ status: "Cliente actualizado." });
        })
        .catch(error => {
          next(newError(error, 400));
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Clients.DeleteClientById = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de id */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      Query(mysqlConnection, "CALL SP_Clients_DeleteClient(?);", [
        req.params.id
      ])
        .then(result => {
          res.status(200).send({ status: "Cliente eliminado." });
        })
        .catch(error => {
          next(newError(error, 400));
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Clients;
