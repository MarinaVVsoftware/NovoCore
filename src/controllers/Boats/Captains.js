const Captains = {};

Captains.GetCaptain = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Captains_GetByBoat(?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(result => res.status(200).send({ captain: result[0][0][0] }))
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Captains.PutCaptain = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Captains_PutByBoat(?,?,?,?,?,?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name),
          req.body.captain.name,
          req.body.captain.phone,
          req.body.captain.email,
          req.body.captain.paymentPermission,
          req.body.captain.aceptationPermission
        ])
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Captains.DeleteCaptain = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Captains_DeleteByBoat(?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Captains;
