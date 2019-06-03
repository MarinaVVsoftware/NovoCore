var mime = require("mime-types");

// BoatDocumentTypes - Controller
const Dropbox = {};

/* Trae la lista de BoatDocumentTypes */
Dropbox.GetAccount = (newError, multer, dropbox) => {
  return (req, res, next) => {
    try {
      dropbox
        .fileListFolder()
        .then(function(response) {
          res.status(200).send({ data: response });
        })
        .catch(function(error) {
          res.status(400).send({ error: error });
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Trae la lista de BoatDocumentTypes */
Dropbox.UploadFile = (newError, dropbox) => {
  return (req, res, next) => {
    try {
      if (!req.file)
        next(newError("No se proporcionó ningún archivo válido.", 400));

      const extension = (fileExtension = mime.extension(req.file.mimetype));
      const extensions = ["doc", "dot", "docx", "pdf", "docm"];

      if (extensions.indexOf(extension) == -1)
        next(
          newError(
            "No se proporcionó un archivo de tipo .doc, .dot, .docx, .pdf ó .docm.",
            400
          )
        );
      else {
        dropbox
          .filesUpload({
            path: "/novonautica/docs/file." + extension,
            contents: req.file.buffer
          })
          .then(function(response) {
            res.status(200).send({ data: response });
          })
          .catch(function(error) {
            res.status(400).send({ error: error });
          });
      }
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Dropbox;
