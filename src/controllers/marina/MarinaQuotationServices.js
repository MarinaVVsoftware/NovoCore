// MarinaQuotationServices - Controller
const MarinaQuotationServices = {};

MarinaQuotationServices.GetMarinaQuotationServices = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaQuotationServices_GetQuotations();")
        .then(result =>
          res.status(200).send({ marinaQuotationServices: result[0][0] })
        )
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaQuotationServices.PostMarinaQuotationService = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      const marinaQuotationService = req.body.marinaQuotationService;

      Query(
        mysqlConnection,
        "CALL SP_MarinaQuotationServices_PostQuotation(?,?,?,?,?,?);",
        [
          marinaQuotationService.boatId,
          marinaQuotationService.marinaQuotationServiceTypeId,
          marinaQuotationService.quantity,
          marinaQuotationService.subtotal,
          marinaQuotationService.tax,
          marinaQuotationService.total
        ]
      )
        .then(() => res.status(201).send())
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaQuotationServices;
