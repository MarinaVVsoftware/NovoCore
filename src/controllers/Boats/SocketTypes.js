const SocketTypes = {};

SocketTypes.GetSocketTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_SocketTypes_GetTypes();")
        .then(result => res.status(200).send({ socketTypes: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = SocketTypes;
