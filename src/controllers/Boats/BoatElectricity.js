// Engines - Controller
const BoatElectricity = {};

/* Trae la lista de Slips */
BoatElectricity.GetBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_READ_BOAT_ELECTRICITY_BY_BOATNAME (?);", [
        decodeURIComponent(req.params.name)
      ])
        .then(result => {
          res.status(200).send({ boatElectricity: result[0][0] });
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
BoatElectricity.PostBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(
        mysqlConnection,
        "CALL SP_CREATE_BOAT_ELECTRICITY_BY_BOATNAME (?,?,?);",
        [
          decodeURIComponent(req.params.name),
          req.body.boatElectricity.cableTypeId,
          req.body.boatElectricity.socketTypeId
        ]
      )
        .then(result => {
          res.status(200).send({ status: "relación eléctrica creada." });
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
BoatElectricity.PutBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      /* Valida manualmente el tipado de id */
      if (isNaN(parseInt(req.params.id)))
        next(newError('el param "id" no es un número válido.', 500));

      console.log(req.body.boatElectricity);

      Query(mysqlConnection, "CALL SP_UPDATE_BOAT_ELECTRICITY (?,?,?,?);", [
        decodeURIComponent(req.params.name),
        req.params.id,
        req.body.boatElectricity.cableTypeId,
        req.body.boatElectricity.socketTypeId
      ])
        .then(result => {
          res.status(200).send({ status: "relación eléctrica creada." });
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
BoatElectricity.DeleteBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      /* Valida manualmente el tipado de id */
      if (isNaN(parseInt(req.params.id)))
        next(newError('el param "id" no es un número válido.', 500));

      Query(mysqlConnection, "CALL SP_DELETE_BOAT_ELECTRICITY (?,?);", [
        decodeURIComponent(req.params.name),
        req.params.id
      ])
        .then(() => {
          res.status(200).send({ status: "BoatElectricity Eliminado." });
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

module.exports = BoatElectricity;
