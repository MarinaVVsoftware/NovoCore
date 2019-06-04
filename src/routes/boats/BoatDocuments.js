/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const BoatDocuments = require(path.resolve(
  __dirname,
  "../../controllers/Boats/boatDocuments"
));
const Schema = require("../../schemas/boats/BoatDocuments");

module.exports = (
  app,
  router,
  newError,
  Query,
  validate,
  mysqlConnection,
  multer,
  dropbox
) => {
  const instances = [newError, dropbox];

  router.get(
    "/api/clients/:id/boats/:name/boat-documents",
    validate({ params: Schema.ParamsGetBoatDocuments }),
    BoatDocuments.GetBoatDocuments(...instances)
  );
  router.put(
    "/api/clients/:id/boats/:name/boat-documents/",
    multer.array("documents"),
    validate({
      params: Schema.ParamsPutBoatDocuments
    }),
    BoatDocuments.PutBoatDocuments(...instances)
  );
  router.put(
    "/api/clients/:id/boats/:name/boat-documents/:typeid",
    multer.single("document"),
    validate({
      params: Schema.ParamsPutBoatDocumentsByType
    }),
    BoatDocuments.PutBoatDocumentByType(...instances)
  );

  app.use(router);
};
