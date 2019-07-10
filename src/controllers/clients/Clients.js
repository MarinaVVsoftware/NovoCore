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
            let client = result[0][0][0][0];
            client.bankAccounts = result[1][0][0];

            res.status(200).send({ client });
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
      let client = req.body.client;
      let bankAccounts = req.body.client.bankAccounts;
      let clientId = null;

      /* Crea el cliente */
      Query(mysqlConnection, "CALL SP_Clients_PostClient(?,?,?,?,?);", [
        client.statusId,
        client.name,
        client.email,
        client.phone,
        client.address
      ])
        .then(result => {
          /* Obtiene el id del cliente creado para usarlo en el resto de inserts */
          clientId = result[0][0][0]["LAST_INSERT_ID()"];
          let Promises = [];

          /* Agrega a la lista de promesas cada cuenta bancaria */
          if (bankAccounts)
            bankAccounts.forEach(bankAccount => {
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_BankAccounts_PutBankAccount(?,?,?,?,?,?);",
                  [
                    clientId,
                    req.params.number,
                    bankAccount.accountNumber,
                    bankAccount.alias,
                    bankAccount.bank,
                    bankAccount.clabe
                  ]
                )
              );
            });

          /* Ejecuta las promesas generadas en caso que se aniden elementos */
          if (Promises.length > 0)
            Promise.all(Promises)
              .then(() => res.status(201).send())
              .catch(error => next(newError(error, 400)));
          else res.status(201).send();
        })
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Clients.PutClient = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      let client = req.body.client;

      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Clients_PutClient(?,?,?,?,?,?);", [
          req.params.id,
          client.statusId,
          client.name,
          client.email,
          client.phone,
          client.address
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
