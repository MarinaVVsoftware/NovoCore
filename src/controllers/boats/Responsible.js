const Responsible = {};

Responsible.GetResponsable = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Responsible_GetByBoat(?, ?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(result =>
            res.status(200).send({ responsable: result[0][0][0] })
          )
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Responsible.PutResponsable = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_Responsible_PutByBoat(?,?,?,?,?,?,?);",
          [
            req.params.id,
            decodeURIComponent(req.params.name),
            req.body.responsable.name,
            req.body.responsable.phone,
            req.body.responsable.email,
            req.body.responsable.paymentPermission,
            req.body.responsable.aceptationPermission
          ]
        )
          .then(() => res.status(201).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Responsible.DeleteResponsable = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Responsible_DeleteByBoat(?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(() => res.status(204).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Responsible;
