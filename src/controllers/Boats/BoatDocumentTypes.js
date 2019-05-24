const newError = require("../../helpers/newError");
const Query = require("../../helpers/query");

// BoatDocumentTypes - Controller
const BoatDocumentTypes = {};

BoatDocumentTypes.GetBoatDocumentTypes = mysqlConnection => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_BOAT_DOCUMENT_TYPES();")
        .then(result => {
          res.status(200).send({ boatDocuments: result[0][0] });
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

module.exports = BoatDocumentTypes;
