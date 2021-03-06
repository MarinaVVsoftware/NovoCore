// BoatDocumentTypes - Controller
const MarinaQuotationTimelineTypes = {};

/* Trae la lista de BoatDocumentTypes */
MarinaQuotationTimelineTypes.GetTimelineTypes = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaQuotationTimelineTypes_GetTypes();")
        .then(result => {
          res.status(200).send({ TimelineTypes: result[0][0] });
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

module.exports = MarinaQuotationTimelineTypes;
