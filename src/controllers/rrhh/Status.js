const Status = {};

Status.GetStatus = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Status_GetStatus();")
        .then(result => res.status(200).send({ status: result[0][0] }))
        .catch(error => next(newError(error.message, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Status;
