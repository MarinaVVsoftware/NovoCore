const newError = require(path.resolve(__dirname, "../../helpers/newError"));
const Query = require(path.resolve(__dirname, "../../helpers/query"));

// BoatDocuments - Controller
const BoatDocuments = {};

/* Trae la lista de BoatDocuments */
BoatDocuments.GetBoatDocuments = mysqlConnection => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_READ_BOAT_DOCUMENTS_BY_BOAT(?);", [
        req.params.name
      ])
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

/* Inserta todos los documentos de un bote en conjunto. */
BoatDocuments.PutBoatDocuments = mysqlConnection => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutBoatDocuments");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Inserta un documento de un barco por su tipo */
BoatDocuments.PutBoatDocumentByType = mysqlConnection => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutBoatDocumentByType");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = BoatDocuments;
