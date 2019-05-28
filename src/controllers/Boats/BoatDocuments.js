// BoatDocuments - Controller
const BoatDocuments = {};

/* Trae la lista de BoatDocuments */
BoatDocuments.GetBoatDocuments = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      Query(mysqlConnection, "CALL SP_READ_BOAT_DOCUMENTS_BY_BOAT(?);", [
        decodeURIComponent(req.params.name)
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
BoatDocuments.PutBoatDocuments = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      let documents = req.body.documents;
      let Promises = [];

      documents.forEach(doc => {
        Promises.push(
          Query(mysqlConnection, "CALL SP_PUT_BOAT_DOCUMENT (?,?,?);", [
            decodeURIComponent(req.params.name),
            doc.boat_document_type_id,
            doc.url
          ])
        );
      });

      Promise.all(Promises)
        .then(() => {
          res.status(200).send({ status: "documentos actualizados." });
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

/* Inserta un documento de un barco por su tipo */
BoatDocuments.PutBoatDocumentByType = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 500));

      /* Valida manualmente el tipado de clientId */
      if (isNaN(parseInt(req.params.typeid)))
        next(newError('el param "typeid" no es un número válido.', 500));

      let document = req.body.document;

      Query(mysqlConnection, "CALL SP_PUT_BOAT_DOCUMENT (?,?,?);", [
        decodeURIComponent(req.params.name),
        document.boat_document_type_id,
        document.url
      ])
        .then(() => {
          res.status(200).send({ status: "documento actualizado." });
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

module.exports = BoatDocuments;
