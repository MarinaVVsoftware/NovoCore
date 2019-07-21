const Ranks = {};

Ranks.GetRanks = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Ranks_GetRanks();")
        .then(result => res.status(200).send({ ranks: result[0][0] }))
        .catch(error => next(newError(error.message, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Ranks;
