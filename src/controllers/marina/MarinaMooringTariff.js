const MarinaMooringTariff = {};

MarinaMooringTariff.GetTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaMooringTariff_GetTariff();")
        .then(result =>
          res.status(200).send({ marinaMooringTariff: result[0][0] })
        )
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.PostTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const marinaMooringTariff = req.body.marinaMooringTariff;

      Query(
        mysqlConnection,
        "CALL SP_MarinaMooringTariff_PostTariff(?,?,?,?,?,?,?,?);",
        [
          marinaMooringTariff.marinaMooringTariffTypeId,
          marinaMooringTariff.name,
          marinaMooringTariff.description,
          marinaMooringTariff.ftMin,
          marinaMooringTariff.ftMax,
          marinaMooringTariff.price,
          marinaMooringTariff.isConditional,
          marinaMooringTariff.creationResponsable
        ]
      )
        .then(() => res.status(201).send())
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.PutTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const marinaMooringTariff = req.body.marinaMooringTariff;

      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      Query(
        mysqlConnection,
        "CALL SP_MarinaMooringTariff_PutTariff(?,?,?,?,?,?,?,?);",
        [
          req.params.id,
          marinaMooringTariff.marinaMooringTariffTypeId,
          marinaMooringTariff.name,
          marinaMooringTariff.description,
          marinaMooringTariff.ftMin,
          marinaMooringTariff.ftMax,
          marinaMooringTariff.price,
          marinaMooringTariff.isConditional
        ]
      )
        .then(() => res.status(201).send())
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.DeleteTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      Query(mysqlConnection, "CALL SP_MarinaMooringTariff_DeleteTariff(?);", [
        req.params.id
      ])
        .then(() => res.status(204).send())
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaMooringTariff;
