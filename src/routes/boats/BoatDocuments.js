/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const BoatDocuments = require(path.resolve(
  __dirname,
  "../../controllers/Boats/boatDocuments"
));
const Schema = require("../../schemas/boats/BoatDocuments");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/clients/:id/boats/:name/boat-documents",
    validate({ params: Schema.ParamsGetBoatDocuments }),
    BoatDocuments.GetBoatDocuments(...instances)
  );
  router.put(
    "/api/clients/:id/boats/:name/boat-documents/",
    validate({
      params: Schema.ParamsPutBoatDocuments,
      body: Schema.BodyPutBoatDocuments
    }),
    BoatDocuments.PutBoatDocuments(...instances)
  );
  router.put(
    "/api/clients/:id/boats/:name/boat-documents/:typeid",
    validate({
      params: Schema.ParamsPutBoatDocumentsByType,
      body: Schema.BodyPutBoatDocumentsByType
    }),
    BoatDocuments.PutBoatDocumentByType(...instances)
  );

  app.use(router);
};
