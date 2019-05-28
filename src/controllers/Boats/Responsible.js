// Responsible - Controller
const Responsible = {};

/* Trae el responsable de un bote */
Responsible.GetResponsable = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_READ_RESPONSABLE(?);", [
        decodeURIComponent(req.params.name)
      ])
        .then(result => {
          res.status(200).send({ responsable: result[0][0][0] });
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

/* Modifica un responsable de un bote basado en su id natural */
Responsible.PutResponsable = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(
        mysqlConnection,
        "CALL SP_UPDATE_RESPONSABLE_BY_BOAT(?,?,?,?,?,?);",
        [
          decodeURIComponent(req.params.name),
          req.body.responsable.name,
          req.body.responsable.phone,
          req.body.responsable.email,
          req.body.responsable.paymentPermission,
          req.body.responsable.aceptationPermission
        ]
      )
        .then(result => {
          res.status(200).send({ status: "Capitan creado o actualizado." });
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

/* Elimina un responsable de un bote basado en su id natural */
Responsible.DeleteResponsable = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_DELETE_RESPONSABLE_BY_BOATNAME(?);", [
        decodeURIComponent(req.params.name)
      ])
        .then(result => {
          res.status(200).send({ status: "capitan eliminado." });
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

module.exports = Responsible;
