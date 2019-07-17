const MarinaMooringTariff = {};

MarinaMooringTariff.GetTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaMooringTariff_GetTariff();")
        .then(result => res.status(200).send({ tariff: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.GetTariffByType = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.type))
        next(newError("el param 'type' no es un número válido.", 406));
      Query(
        mysqlConnection,
        "CALL SP_MarinaMooringTariff_GetTariffByType(?);",
        [req.params.type]
      )
        .then(result => res.status(200).send({ tariff: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaMooringTariff.PostTariff = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const tariff = req.body.marinaMooringTariff;

      /* Si la tarifa es de tipo "general" entonces revisa colisiones */
      if (tariff.marinaMooringTariffTypeId == 1) {
        Query(
          mysqlConnection,
          "CALL SP_MarinaMooringTariff_GetTariffByType(?);",
          [tariff.marinaMooringTariffTypeId]
        )
          .then(result => {
            tariffs = result[0][0];
            colision = false;
            collided = null;

            /* Verifica que la tarifa que se está insertando no tenga
            ft dentro de rangos de tarifas ya existentes. */
            tariffs.forEach(t => {
              /* cuando ambos son true significa que la tarifa colisiona */
              if (!(t.ftMin > tariff.ftMax) && !(t.ftMax < tariff.ftMin)) {
                colision = true;
                collided = t.marinaMooringTariffId;
              }
            });

            if (!colision)
              Query(
                mysqlConnection,
                "CALL SP_MarinaMooringTariff_PostTariff(?,?,?,?,?,?,?,?);",
                [
                  tariff.marinaMooringTariffTypeId,
                  tariff.name,
                  tariff.description,
                  tariff.ftMin,
                  tariff.ftMax,
                  tariff.price,
                  tariff.isConditional,
                  tariff.creationResponsable
                ]
              )
                .then(() => res.status(201).send())
                .catch(error => next(newError(error, 400)));
            else
              next(
                newError(
                  "Esta tarifa colisiona con la tarifa: " + collided,
                  400
                )
              );
          })
          .catch(error => next(newError(error, 400)));
      } else
        Query(
          mysqlConnection,
          "CALL SP_MarinaMooringTariff_PostTariff(?,?,?,?,?,?,?,?);",
          [
            tariff.marinaMooringTariffTypeId,
            tariff.name,
            tariff.description,
            tariff.ftMin,
            tariff.ftMax,
            tariff.price,
            tariff.isConditional,
            tariff.creationResponsable
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
      const tariff = req.body.marinaMooringTariff;

      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else {
        /* Si la tarifa es de tipo "general" entonces revisa colisiones */
        if (tariff.marinaMooringTariffTypeId == 1) {
          Query(
            mysqlConnection,
            "CALL SP_MarinaMooringTariff_GetTariffByType(?);",
            [tariff.marinaMooringTariffTypeId]
          )
            .then(result => {
              tariffs = result[0][0];
              colision = false;
              collided = null;

              /* Verifica que la tarifa que se está insertando no tenga
              ft dentro de rangos de tarifas ya existentes. */
              tariffs.forEach(t => {
                /* cuando ambos son true significa que la tarifa colisiona. excluye
                la validación si la tarifa a modificar es la misma */
                if (t.marinaMooringTariffId != req.params.id)
                  if (!(t.ftMin > tariff.ftMax) && !(t.ftMax < tariff.ftMin)) {
                    colision = true;
                    collided = t.marinaMooringTariffId;
                  }
              });

              if (!colision)
                Query(
                  mysqlConnection,
                  "CALL SP_MarinaMooringTariff_PutTariff(?,?,?,?,?,?,?,?);",
                  [
                    req.params.id,
                    tariff.marinaMooringTariffTypeId,
                    tariff.name,
                    tariff.description,
                    tariff.ftMin,
                    tariff.ftMax,
                    tariff.price,
                    tariff.isConditional
                  ]
                )
                  .then(() => res.status(201).send())
                  .catch(error => next(newError(error, 400)));
              else
                next(
                  newError(
                    "Esta tarifa colisiona con la tarifa: " + collided,
                    400
                  )
                );
            })
            .catch(error => next(newError(error, 400)));
        } else
          Query(
            mysqlConnection,
            "CALL SP_MarinaMooringTariff_PutTariff(?,?,?,?,?,?,?,?);",
            [
              req.params.id,
              tariff.marinaMooringTariffTypeId,
              tariff.name,
              tariff.description,
              tariff.ftMin,
              tariff.ftMax,
              tariff.price,
              tariff.isConditional
            ]
          )
            .then(() => res.status(201).send())
            .catch(error => next(newError(error, 400)));
      }
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
