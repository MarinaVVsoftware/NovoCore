const BoatDocumentTypes = {};

BoatDocumentTypes.GetBoatDocumentTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_BoatDocumentTypes_GetTypes();")
        .then(result => res.status(200).send({ boatDocuments: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = BoatDocumentTypes;
