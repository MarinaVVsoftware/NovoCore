const MarinaMooringTariffTypes = {};

MarinaMooringTariffTypes.GetTariffTypes = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaMooringTariffTypes_GetTypes();")
        .then(result =>
          res.status(200).send({ mooringTariffTypes: result[0][0] })
        )
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaMooringTariffTypes;
