// Controller - Clients
const Clients = {};

Clients.GetClientById = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else {
        let Promises = [
          Query(mysqlConnection, "CALL SP_Clients_GetClientById(?);", [
            req.params.id
          ]),
          Query(mysqlConnection, "CALL SP_BankAccounts_GetBankAccounts(?);", [
            req.params.id
          ])
        ];

        Promise.all(Promises)
          .then(result => {
            res.status(200).send({
              client: {
                client: result[0][0][0],
                bankAccounts: result[1][0][0]
              }
            });
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Clients.GetClients = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Clients_GetClients();")
        .then(result => res.status(200).send({ clients: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Clients.PostClient = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Clients_PostClient(?,?,?,?,?);", [
        req.body.statusId,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address
      ])
        .then(() => res.status(201).send())
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Clients.PutClient = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Clients_PutClient(?,?,?,?,?,?);", [
          req.params.id,
          req.body.statusId,
          req.body.name,
          req.body.email,
          req.body.phone,
          req.body.address
        ])
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Clients.DeleteClientById = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Clients_DeleteClient(?);", [
          req.params.id
        ])
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Clients;
