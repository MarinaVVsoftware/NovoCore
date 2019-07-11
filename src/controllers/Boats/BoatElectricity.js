const BoatElectricity = {};

BoatElectricity.GetBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_BoatElectricity_GetByBoat (?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(result =>
            res.status(200).send({ boatElectricity: result[0][0] })
          )
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

BoatElectricity.PostBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_BoatElectricity_PostByBoat (?,?,?,?);",
          [
            req.params.id,
            decodeURIComponent(req.params.name),
            req.body.boatElectricity.cableTypeId,
            req.body.boatElectricity.socketTypeId
          ]
        )
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

BoatElectricity.PutBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.electricityid))
        next(newError("el param 'electricityid' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_BoatElectricity_PutByElectricityId (?,?,?,?,?);",
          [
            req.params.id,
            decodeURIComponent(req.params.name),
            req.params.electricityid,
            req.body.boatElectricity.cableTypeId,
            req.body.boatElectricity.socketTypeId
          ]
        )
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

/* Elimina un engine de un bote basado en su id natural */
BoatElectricity.DeleteBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.electricityid))
        next(newError("el param 'electricityid' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_BoatElectricity_DeleteByElectricityId (?,?,?);",
          [
            req.params.id,
            decodeURIComponent(req.params.name),
            req.params.electricityid
          ]
        )
          .then(() => res.status(204).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = BoatElectricity;
