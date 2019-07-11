const ElectronicWalletHistoric = {};

ElectronicWalletHistoric.GetHistoric = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_ElectronicWalletHistoric_GetAllHistoric(?);",
          [req.params.id]
        )
          .then(result =>
            res.status(200).send({ electronicWalletHistoric: result[0][0] })
          )
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = ElectronicWalletHistoric;
