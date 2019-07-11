/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const BoatDocuments = require(path.resolve(
  __dirname,
  "../../controllers/boats/BoatDocuments"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/boats/BoatDocuments"
));

module.exports = (
  app,
  router,
  newError,
  Query,
  validate,
  mysqlConnection,
  multer,
  dropbox,
  redis,
  redisHandler
) => {
  const instances = [newError, Query, mysqlConnection];

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
    BoatDocuments.PutBoatDocuments(newError, Query, mysqlConnection, dropbox)
  );
  router.put(
    "/api/clients/:id/boats/:name/boat-documents/:typeid",
    multer.single("document"),
    validate({
      params: Schema.ParamsPutBoatDocumentsByType
    }),
    BoatDocuments.PutBoatDocumentByType(
      newError,
      Query,
      mysqlConnection,
      dropbox
    )
  );

  app.use(router);
};
