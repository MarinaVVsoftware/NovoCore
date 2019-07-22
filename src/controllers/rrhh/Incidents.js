const Incidents = {};

Incidents.GetIncidentsByUser = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Incidents_GetIncidents();")
          .then(result => res.status(200).send({ Incidents: result[0][0] }))
          .catch(error => next(newError(error.message, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Incidents.PostIncidentByUser = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const sqlError = error => {
        let message = "";
        let code = 400;
        switch (parseInt(error.sqlState)) {
          case 45000:
            message = "El usuario no existe. Seleccione un usuario válido.";
            break;
          case 45001:
            message =
              "El tipo de incidente no existe. Seleccione un tipo de incidente válido.";
            break;
          default:
            message =
              "Novocore falló al crear el incidente. Contacte con soporte.";
            break;
        }
        next(newError(message, code));
      };

      const incident = req.body.incident;

      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Incidents_PostIncident(?,?,?,?);", [
          decodeURIComponent(req.params.name),
          incident.incidentTypeId,
          incident.title,
          incident.description
        ])
          .then(() => res.status(201).send())
          .catch(error => sqlError(error));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Incidents.PutIncidentByUser = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const sqlError = error => {
        let message = "";
        let code = 400;
        switch (parseInt(error.sqlState)) {
          case 45000:
            message = "El incidente no existe. Seleccione un incidente válido.";
            break;
          case 45001:
            message = "El usuario no existe. Seleccione un usuario válido.";
            break;
          case 45002:
            message =
              "El tipo de incidente no existe. Seleccione un tipo de incidente válido.";
            break;
          case 45003:
            message =
              "El usuario no está relacionado con el incidente. Contacte con soporte.";
            break;
          default:
            message =
              "Novocore falló al actualizar el incidente. Contacte con soporte.";
            break;
        }
        next(newError(message, code));
      };

      const incident = req.body.incident;

      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Incidents_PutById(?,?,?,?,?);", [
          decodeURIComponent(req.params.name),
          req.params.id,
          incident.incidentTypeId,
          incident.title,
          incident.description
        ])
          .then(() => res.status(201).send())
          .catch(error => sqlError(error));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Incidents.DeleteIncidentByUser = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const sqlError = error => {
        let message = "";
        let code = 400;
        switch (parseInt(error.sqlState)) {
          case 45000:
            message = "El usuario no existe. Seleccione un usuario válido.";
            break;
          case 45001:
            message = "El incidente no existe. Contacte con soporte.";
            break;
          case 45002:
            message =
              "El usuario no está relacionado con el incidente. Contacte con soporte.";
            break;
          default:
            message =
              "Novocore falló al eliminar el incidente. Contacte con soporte.";
            break;
        }
        next(newError(message, code));
      };

      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Incidents_DeleteById(?,?);", [
          decodeURIComponent(req.params.name),
          req.params.id
        ])
          .then(() => res.status(204).send())
          .catch(error => sqlError(error));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Incidents;
