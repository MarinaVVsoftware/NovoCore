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
        .then(result => res.status(200).send({ timelineTypes: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaQuotationTimelineTypes;
