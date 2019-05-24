/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const BoatDocuments = require(path.resolve(
  __dirname,
  "../../controllers/Boats/boatDocuments"
));

module.exports = (app, router, validate, mysqlConnection) => {
  router.get(
    "/api/boats/:name/boat-documents/",
    BoatDocuments.GetBoatDocuments(mysqlConnection)
  );
  router.put(
    "/api/boats/:name/boat-documents/",
    BoatDocuments.PutBoatDocuments(mysqlConnection)
  );
  router.put(
    "/api/boats/:name/boat-documents/:type",
    BoatDocuments.PutBoatDocumentByType(mysqlConnection)
  );

  app.use(router);
};
