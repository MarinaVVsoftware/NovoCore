const IncidentTypes = {};

IncidentTypes.GetIncidentTypes = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      Query(mysqlConnection, "CALL SP_IncidentTypes_GetTypes();")
        .then(result => {
          res.status(200).send({ IncidentTypes: result[0][0] });
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

module.exports = IncidentTypes;
