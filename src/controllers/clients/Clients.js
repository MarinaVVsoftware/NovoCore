// Controller - Clients
const Clients = {};

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

Clients.GetClientById = (
  newError,
  Query,
  mysqlConnection,
  Fetch,
  host,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else {
        Query(mysqlConnection, "CALL SP_Clients_GetClientById(?);", [
          req.params.id
        ])
          .then(client => {
            const params = {
              method: "GET",
              headers: {
                authorization: req.get("Authorization")
              }
            };
            let Promises = [
              Fetch(
                host + "/api/clients/" + req.params.id + "/bank-accounts/",
                params
              ),
              Fetch(
                host + "/api/clients/" + req.params.id + "/social-reasons/",
                params
              ),
              Fetch(
                host + "/api/clients/" + req.params.id + "/electronic-wallet/",
                params
              ),
              Fetch(
                host +
                  "/api/clients/" +
                  req.params.id +
                  "/electronic-wallet-historic/",
                params
              )
            ];

            Promise.all(Promises)
              .then(result => {
                /* Contruye un arreglo de promesas de await r.json() */
                let P = [];
                const jsonPromise = async r => await r.json();
                result.forEach(r => P.push(jsonPromise(r)));

                Promise.all(P)
                  .then(r => {
                    let response = client[0][0][0];
                    let error = null;

                    r.forEach(e => {
                      if (e.error) error = e.error;
                    });

                    if (!error) {
                      response.bankAccounts = r[0].error
                        ? r[0].error
                        : r[0].bankAccounts;
                      response.socialReasons = r[1].error
                        ? r[1].error
                        : r[1].socialReasons;
                      response.electronicWallet = r[2].error
                        ? r[2].error
                        : r[2].electronicWallet;
                      response.electronicWalletHistoric = r[3].error
                        ? r[3].error
                        : r[3].electronicWalletHistoric;
                      res.status(200).send({ client: response });
                    } else next(newError(error, 400));
                  })
                  .catch(error => next(newError(error, 400)));
              })
              .catch(error => next(newError(error, 400)));
          })
          .catch(error => next(newError(...ErrorSchema(error))));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Clients.PostClient = (newError, Query, mysqlConnection, ErrorSchema, host) => {
  return (req, res, next) => {
    try {
      let client = req.body.client;
      let bankAccounts = req.body.client.bankAccounts;
      let socialReasons = req.body.client.socialReasons;
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

          if (socialReasons)
            socialReasons.forEach(socialReason => {
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_SocialReasons_PutSocialReason(?,?,?,?,?,?);",
                  [
                    clientId,
                    socialReason.rfc,
                    socialReason.socialReason,
                    socialReason.cfdi,
                    socialReason.email,
                    socialReason.address
                  ]
                )
              );
            });

          /* Crea el monedero del cliente */
          Promises.push(
            Query(mysqlConnection, "CALL SP_ElectronicWallet_PostWallet(?);", [
              clientId
            ])
          );

          /* Ejecuta las promesas generadas en caso que se aniden elementos */
          if (Promises.length > 0)
            Promise.all(Promises)
              .then(() => res.status(201).send())
              .catch(error => next(newError(error, 400)));
          else res.status(201).send();
        })
        .catch(error => next(newError(...ErrorSchema(error))));
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

Clients.DeleteClientById = (newError, Query, mysqlConnection, ErrorSchema) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Clients_DeleteClient(?);", [
          req.params.id
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Clients;
