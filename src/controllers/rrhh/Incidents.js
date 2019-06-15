const Incidents = {};

Incidents.GetIncidentsByUser = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre del usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_Incidents_GetIncidents();")
        .then(result => {
          res.status(200).send({ Incidents: result[0][0] });
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

Incidents.PostIncidentByUser = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre del usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_Incidents_PostIncident(?,?,?,?);", [
        decodeURIComponent(req.params.name),
        req.body.incident_type_id,
        req.body.title,
        req.body.description
      ])
        .then(result => {
          res.status(200).send({ status: "Incidente creado correctamente." });
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

Incidents.PutIncidentByUser = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre del usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      /* Valida manualmente el tipado de clientId */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      Query(mysqlConnection, "CALL SP_Incidents_PutById(?,?,?,?,?);", [
        decodeURIComponent(req.params.name),
        req.params.id,
        req.body.incident_type_id,
        req.body.title,
        req.body.description
      ])
        .then(result => {
          res
            .status(200)
            .send({ status: "Incidente modificado correctamente." });
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

Incidents.DeleteIncidentByUser = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre del usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      /* Valida manualmente el tipado de clientId */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      Query(mysqlConnection, "CALL SP_Incidents_DeleteById(?,?);", [
        decodeURIComponent(req.params.name),
        req.params.id
      ])
        .then(result => {
          res
            .status(200)
            .send({ status: "Incidente eliminado correctamente." });
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

module.exports = Incidents;
