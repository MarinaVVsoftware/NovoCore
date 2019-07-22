const BankAccounts = {};

BankAccounts.GetBankAccounts = (
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
        Query(mysqlConnection, "CALL SP_BankAccounts_GetBankAccounts(?);", [
          req.params.id
        ])
          .then(result => res.status(200).send({ bankAccounts: result[0][0] }))
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

BankAccounts.PutBankAccount = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      const bankAccount = req.body.bankAccount;

      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else if (/^\w{1,17}$i/.test(decodeURIComponent(req.params.number)))
        next(newError("el param 'number' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_BankAccounts_PutBankAccount(?,?,?,?,?,?);",
          [
            req.params.id,
            req.params.number,
            bankAccount.accountNumber,
            bankAccount.alias,
            bankAccount.bank,
            bankAccount.clabe
          ]
        )
          .then(() => res.status(201).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

BankAccounts.DeleteBankAccount = (
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
        Query(mysqlConnection, "CALL SP_BankAccounts_DeleteBankAccount(?,?);", [
          req.params.id,
          req.params.number
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = BankAccounts;
