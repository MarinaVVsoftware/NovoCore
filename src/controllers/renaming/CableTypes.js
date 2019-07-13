const CableTypes = {};

CableTypes.GetCableTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_CableTypes_GetTypes();")
        .then(result => res.status(200).send({ cableTypes: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = CableTypes;
