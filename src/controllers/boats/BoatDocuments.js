var mime = require("mime-types");
const path = require("path");
const constants = require(path.resolve(__dirname, "../../helpers/Constants"));
const BoatDocuments = {};

BoatDocuments.GetBoatDocuments = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_BoatDocuments_GetByBoat(?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(result => res.status(200).send({ boatDocuments: result[0][0] }))
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

BoatDocuments.PutBoatDocuments = (
  newError,
  Query,
  mysqlConnection,
  dropbox
) => {
  return (req, res, next) => {
    try {
      /* Se validan los params y que se estén enviando los archivos a la API
	  via multipart y la cantidad correcta de documentos. */
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (!req.files)
        next(newError("No se proporcionó el objeto multipart.", 406));
      else if (req.files.length == 0)
        next(
          newError("No se proporcionó ningún documento via multipart. ", 406)
        );
      else if (!req.body.body)
        next(newError("No se proporcionó el body dentro del multipart"));
      else {
        /* Se envían los archivos via DROPBOX */
        /* se requiere la lista de elementos nulos o reales en el body */
        body = JSON.parse(req.body.body);
        let files = [];
        let Promises = [];
        let LinkPromises = [];
        let SqlPromises = [];

        /* Construye los nombres de todos los archivos */
        let date = Date.now(); // timestamp para el nombre del archivo
        let fileCounter = 0;
        for (let index = 0; index < body.documents.length; index++) {
          // si en el body se especifica que no se recibió archivo, se descarta
          if (body.documents[index].sent) {
            // calcula la extensión del archivo
            const extension = (fileExtension = mime.extension(
              req.files[fileCounter].mimetype
            ));
            const extensions = constants.boatDocuments.extensions;

            /* Si la extensión pertenece al grupo aceptado, retorna !-1 */
            if (extensions.indexOf(extension) != -1) {
              /* Genera el nombre del documento */
              let path =
                constants.boatDocuments.folder +
                decodeURIComponent(req.params.name) +
                "/";
              let name = index + 1 + "-" + date + "." + extension;

              // UploadPromises.push(dropbox.UploadFile(path + name, file.buffer));
              files.push({
                path: path + name,
                buffer: req.files[fileCounter].buffer,
                offset: req.files[fileCounter].buffer.length
              });
              fileCounter++;
            } else {
              next(
                newError(
                  "No se proporcionó un archivo con extensión válida.",
                  406
                )
              );
              return;
            }
          }
        }

        files.forEach(file => {
          Promises.push(dropbox.UploadFileBySession(file.buffer));
        });

        /* Crea una sesión por cada archivo */
        Promise.all(Promises)
          .then(response => {
            let entries = [];

            files.forEach((file, index) => {
              entries.push({
                cursor: {
                  session_id: response[index].session_id,
                  offset: file.buffer.length
                },
                commit: {
                  path: file.path
                }
              });
            });

            /* Ejecuta las sesiones, las envía, y espera a que se suban los archivos */
            dropbox
              .CloseSession(entries)
              .then(response => {
                const jobId = response.async_job_id;

                /* Código weird que envía peticiones a dropbox para averiguar
                cuando se carguen los archivos. Es necesario para obtener el objeto de
                respuesta y generar los links */
                function WaitSucess() {
                  return dropbox
                    .CheckSessionStatus(jobId)
                    .then(r => {
                      if (r[".tag"] != "complete") return WaitSucess();
                      else {
                        r.entries.forEach(entry => {
                          LinkPromises.push(
                            dropbox.GetLink(entry.path_display)
                          );
                        });

                        /* Genera todos los shared links */
                        Promise.all(LinkPromises)
                          .then(results => {
                            /* Crea todos los llamados SQL a ejecutar */
                            results.forEach(result => {
                              SqlPromises.push(
                                Query(
                                  mysqlConnection,
                                  "CALL SP_BoatDocuments_PutByBoat (?,?,?,?);",
                                  [
                                    req.params.id,
                                    decodeURIComponent(req.params.name),
                                    // extrae el primer char del nombre, que representa el tipo de documento
                                    result.name.substring(0, 1),
                                    // obtiene la shared url para guardarla
                                    result.url
                                  ]
                                )
                              );

                              /* Ejecuta las promesas y finaliza el endpoint */
                              Promise.all(SqlPromises)
                                .then(() => res.status(201).send())
                                .catch(error => next(newError(error, 400)));
                            });
                          })
                          .catch(error => next(newError(error, 400)));
                      }
                    })
                    .catch(error => next(newError(error, 400)));
                }

                /* Ejecuta la función recursiva */
                WaitSucess();
              })
              .catch(error => next(newError(error, 400)));
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

BoatDocuments.PutBoatDocumentByType = (
  newError,
  Query,
  mysqlConnection,
  dropbox
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else if (isNaN(req.params.typeid))
        next(newError("el param 'typeid' no es un número válido.", 406));
      else if (!req.file)
        next(newError("No se proporcionó ningún archivo vía multipart.", 406));
      else {
      }

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
                  .then(() => res.status(201).send())
                  .catch(error => next(newError(error, 400)));
              })
              .catch(error => next(newError(error, 400)));
          })
          .catch(error => next(newError(error, 400)));
      } else {
        next(
          newError("No se proporcionó un archivo con extensión válida.", 400)
        );
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = BoatDocuments;
