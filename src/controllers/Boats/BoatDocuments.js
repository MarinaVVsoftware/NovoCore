var mime = require("mime-types");
const path = require("path");
const constants = require(path.resolve(__dirname, "../../helpers/Constants"));
// BoatDocuments - Controller
const BoatDocuments = {};

/* Trae la lista de BoatDocuments */
BoatDocuments.GetBoatDocuments = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de clientId */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_BoatDocuments_GetByBoat(?,?);", [
        req.params.id,
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
BoatDocuments.PutBoatDocuments = (newError, dropbox) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de id */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      /* Valida que se esté enviando el archivo via multipart */
      if (!req.files)
        next(newError("No se proporcionó ningún archivo vía multipart.", 400));

      /* Valida que se esté enviando el archivo via multipart */
      if (req.files.length != constants.boats.boatDocumentsLength)
        next(
          newError(
            "No se proporcionó la cantidad correcta de documentos: " +
              constants.boats.boatDocumentsLength,
            400
          )
        );

      /* se requiere la lista de elementos nulos o reales en el body */
      body = JSON.parse(req.body.body);
      /* Variables requeridas para construir las promesas y los nombres de archivos */
      let UploadPromises = [];
      let LinkPromises = [];
      let SqlPromises = [];
      let filenames = [];

      /* Construye los nombres de todos los archivos */
      let date = Date.now();
      req.files.forEach((file, index) => {
        if (body.documents[index].sent) {
          console.log("documento " + ++index + " es nulo. abortado.");
          return;
        }
        const extension = (fileExtension = mime.extension(file.mimetype));
        const extensions = constants.boatDocuments.extensions;

        /* Si la extensión pertenece al grupo aceptado, retorna !-1 */
        if (extensions.indexOf(extension) != -1) {
          /* Genera el nombre del documento */
          let path =
            constants.boatDocuments.folder +
            decodeURIComponent(req.params.name) +
            "/";
          let name = ++index + "-" + date + "." + extension;
          filenames.push(path + name);

          UploadPromises.push(dropbox.UploadFile(path + name, file.buffer));
          LinkPromises.push(dropbox.GetLink(path + name));
        } else {
          next(
            newError("No se proporcionó un archivo con extensión válida.", 400)
          );
        }
      });

      Promise.all(UploadPromises)
        .then(result => {
          res.status(201).send({ result });
        })
        .catch(error => {
          console.log(error);
          // next(error);
        });

      // res.send({ filenames: filenames });

      // let documents = req.body.documents;
      // let Promises = [];

      // documents.forEach(doc => {
      //   Promises.push(
      //     Query(mysqlConnection, "CALL SP_BoatDocuments_PutByBoat (?,?,?,?);", [
      //       req.params.id,
      //       decodeURIComponent(req.params.name),
      //       doc.boat_document_type_id,
      //       doc.url
      //     ])
      //   );
      // });

      // Promise.all(Promises)
      //   .then(() => {
      //     res.status(200).send({ status: "documentos actualizados." });
      //   })
      //   .catch(error => {
      //     /* retorna el mensaje de error */
      //     console.log(error);
      //     next(error);
      //   });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Inserta un documento de un barco por su tipo */
BoatDocuments.PutBoatDocumentByType = (
  newError,
  Query,
  mysqlConnection,
  dropbox
) => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de id */
      if (isNaN(req.params.id))
        next(newError('el param "id" no es un número válido.', 400));

      /* Valida manualmente si el nombre del barco es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      /* Valida manualmente el tipado de typeid */
      if (isNaN(req.params.typeid))
        next(newError('el param "typeid" no es un número válido.', 400));

      /* Valida que se esté enviando el archivo via multipart */
      if (!req.file)
        next(newError("No se proporcionó ningún archivo vía multipart.", 400));

      /* calcula la extensión para validar el tipo de archivo */
      const extension = (fileExtension = mime.extension(req.file.mimetype));
      const extensions = constants.boatDocuments.extensions;

      /* Si la extensión pertenece al grupo aceptado, retorna !-1 */
      if (extensions.indexOf(extension) != -1) {
        /* Genera el nombre del documento */
        let path =
          constants.boatDocuments.folder +
          decodeURIComponent(req.params.name) +
          "/";
        let name = req.params.typeid + "-" + Date.now() + "." + extension;

        /* Carga el archivo en dropbox */
        dropbox
          .UploadFile(path + name, req.file.buffer)
          .then(result => {
            /* Genera la nueva url de descarga de dropbox */
            dropbox
              .GetLink(result.path_display)
              .then(result => {
                /* Inserta en base de datos la nueva url del documento */
                Query(
                  mysqlConnection,
                  "CALL SP_BoatDocuments_PutByBoat (?,?,?,?);",
                  [
                    req.params.id,
                    decodeURIComponent(req.params.name),
                    req.params.typeid,
                    result.url
                  ]
                )
                  .then(() => {
                    res.status(200).send({
                      status: "documento actualizado. nueva url: " + result.url
                    });
                  })
                  .catch(error => next(error));
              })
              .catch(error => next(error));
          })
          .catch(error => next(error));
      } else {
        next(
          newError("No se proporcionó un archivo con extensión válida.", 400)
        );
      }
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = BoatDocuments;
