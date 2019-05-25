/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const BoatDocuments = require(path.resolve(
  __dirname,
  "../../controllers/Boats/boatDocuments"
));
const Schema = require("../../schemas/boats/BoatDocuments");

module.exports = (app, router, validate, mysqlConnection) => {
  router.get(
    "/api/boats/:name/boat-documents/",
    validate({ params: Schema.ParamsGetBoatDocuments }),
    BoatDocuments.GetBoatDocuments(mysqlConnection)
  );
  router.put(
    "/api/boats/:name/boat-documents/",
    validate({
      params: Schema.ParamsPutBoatDocuments,
      body: Schema.BodyPutBoatDocuments
    }),
    BoatDocuments.PutBoatDocuments(mysqlConnection)
  );
  router.put(
    "/api/boats/:name/boat-documents/:typeid",
    validate({
      params: Schema.ParamsPutBoatDocumentsByType,
      body: Schema.BodyPutBoatDocumentsByType
    }),
    BoatDocuments.PutBoatDocumentByType(mysqlConnection)
  );

  app.use(router);
};
