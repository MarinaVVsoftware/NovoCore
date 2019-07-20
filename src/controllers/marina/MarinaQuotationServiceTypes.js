// MarinaQuotationServiceTypes - Controller
const MarinaQuotationServiceTypes = {};

MarinaQuotationServiceTypes.GetMarinaQuotationServiceTypes = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaQuotationServiceTypes_GetTypes();")
        .then(result =>
          res.status(200).send({ marinaQuotationServiceTypes: result[0][0] })
        )
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaQuotationServiceTypes;
