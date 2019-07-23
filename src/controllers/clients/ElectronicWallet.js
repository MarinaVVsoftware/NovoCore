const ElectronicWallet = {};

ElectronicWallet.GetElectronicWallet = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_ElectronicWallet_GetWallet(?);", [
          req.params.id
        ])
          .then(result =>
            res.status(200).send({ electronicWallet: result[0][0] })
          )
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

ElectronicWallet.PostElectronicWalletMovement = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      const electronicWalletMovement = req.body.electronicWalletMovement;

      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else {
        Query(mysqlConnection, "CALL SP_ElectronicWallet_GetWallet(?);", [
          req.params.id
        ])
          .then(result => {
            /* Obtiene el monto actual */
            let oldAmount = result[0][0][0]["marinaAmount"];

            /* Verifica que no se intente insertar un monto igual al existente */
            if (oldAmount == electronicWalletMovement.newAmount)
              next(
                newError("El nuevo monto no puede ser igual al anterior.", 406)
              );
            else {
              /* Actualiza el total del monedero e inserta un row en el historial */
              let Promises = [
                Query(
                  mysqlConnection,
                  "CALL SP_ElectronicWallet_PatchMarinaAmount(?,?);",
                  [req.params.id, electronicWalletMovement.newAmount]
                ),
                Query(
                  mysqlConnection,
                  "CALL SP_ElectronicWalletHistoric_PostHistoric(?,?,?,?,?);",
                  [
                    req.params.id,
                    oldAmount,
                    electronicWalletMovement.newAmount,
                    electronicWalletMovement.description,
                    electronicWalletMovement.alterResponsable
                  ]
                )
              ];

              Promise.all(Promises)
                .then(() => res.status(201).send())
                .catch(error => next(newError(error, 400)));
            }
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

ElectronicWallet.PutElectronicWallet = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_ElectronicWallet_PutWallet(?);", [
          req.params.id
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

ElectronicWallet.PatchMarinaAmount = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_ElectronicWallet_PatchMarinaAmount(?,?);",
          [req.params.id, req.body.marinaAmount]
        )
          .then(() => res.status(204).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = ElectronicWallet;
