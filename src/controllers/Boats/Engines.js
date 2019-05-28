// Engines - Controller
const Engines = {};

/* Trae la lista de Slips */
Engines.GetEngines = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_READ_ENGINES_BY_BOAT(?);", [
        decodeURIComponent(req.params.name)
      ])
        .then(result => {
          res.status(200).send({ engines: result[0][0] });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Inserta un nuevo engine asociado a un bote */
Engines.PostEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_CREATE_ENGINE_BY_BOAT(?, ?, ?);", [
        decodeURIComponent(req.params.name),
        req.body.engine.model,
        req.body.engine.brand
      ])
        .then(result => {
          res.status(200).send({
            status: "Engine creado.",
            id: result[0][0][0]["LAST_INSERT_ID()"]
          });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Modifica un engine de un bote basado en su id natural */
Engines.PutEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      /* Valida manualmente el tipado de clientId */
      if (isNaN(parseInt(req.params.id)))
        next(newError('el param "id" no es un número válido.', 500));

      Query(mysqlConnection, "CALL SP_UPDATE_ENGINE_BY_ID(?, ?, ?, ?);", [
        decodeURIComponent(req.params.name),
        req.params.id,
        req.body.engine.model,
        req.body.engine.brand
      ])
        .then(result => {
          res.status(200).send({
            status: "Engine actualizado."
          });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Elimina un engine de un bote basado en su id natural */
Engines.DeleteEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      /* Valida manualmente el tipado de clientId */
      if (isNaN(parseInt(req.params.id)))
        next(newError('el param "id" no es un número válido.', 500));

      Query(mysqlConnection, "CALL SP_DELETE_ENGINE_BY_ID(?);", [req.params.id])
        .then(result => {
          res.status(200).send({
            status: "Engine eliminado."
          });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Engines;
