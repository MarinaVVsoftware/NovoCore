const Engines = {};

Engines.GetEngines = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Engines_GetByBoat(?, ?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(result => res.status(200).send({ engines: result[0][0] }))
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

/* Inserta un nuevo engine asociado a un bote */
Engines.PostEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Engines_PostByBoat(?,?,?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name),
          req.body.engine.model,
          req.body.engine.brand
        ])
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

/* Modifica un engine de un bote basado en su id natural */
Engines.PutEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.engineid))
        next(newError('el param "engineid" no es un número válido.', 400));
      else
        Query(mysqlConnection, "CALL SP_Engines_PutEngineById(?,?,?,?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name),
          req.params.engineid,
          req.body.engine.model,
          req.body.engine.brand
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Engines.DeleteEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.engineid))
        next(newError('el param "engineid" no es un número válido.', 400));
      else
        Query(mysqlConnection, "CALL SP_Engines_DeleteById(?,?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name),
          req.params.engineid
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Engines;
