const MarinaMooringTariff = {};

MarinaMooringTariff.GetTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetTariff");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.PostTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PostTariff");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.PutTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutTariff");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.DeleteTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteTariff");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaMooringTariff;
