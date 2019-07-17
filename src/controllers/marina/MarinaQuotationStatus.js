const SlipTypes = {};

SlipTypes.GetQuotationStatus = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaQuotationStatus_GetStatus();")
        .then(result =>
          res.status(200).send({ marinaQuotationStatus: result[0][0] })
        )
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = SlipTypes;
