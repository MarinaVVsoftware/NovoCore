const IncidentTypes = {};

IncidentTypes.GetIncidentTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_IncidentTypes_GetTypes();")
        .then(result => res.status(200).send({ IncidentTypes: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = IncidentTypes;
