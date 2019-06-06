// MarinaQuotationTimeline - Controller
const MarinaQuotationTimeline = {};

/* Trae la lista de GetTimelineByQuotation */
MarinaQuotationTimeline.GetTimelineByQuotation = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de id */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      Query(
        mysqlConnection,
        "CALL SP_MarinaQuotationTimeline_GetByQuotation(?);",
        [req.params.id]
      )
        .then(result => {
          res.status(200);
          res.json({ Timeline: result[0][0] });
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaQuotationTimeline;
