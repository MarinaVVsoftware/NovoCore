const MarinaMooringTariffTypes = {};

MarinaMooringTariffTypes.GetTariffTypes = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetTariffTypes");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaMooringTariffTypes;
