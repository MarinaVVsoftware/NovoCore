const Incidents = {};

Incidents.GetIncidentsByUser = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Incidents_GetIncidentsByUser(?);", [
          req.params.name
        ])
          .then(result => res.status(200).send({ Incidents: result[0][0] }))
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Incidents.PostIncidentByUser = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
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
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Incidents.PutIncidentByUser = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
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
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Incidents.DeleteIncidentByUser = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
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
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Incidents;
