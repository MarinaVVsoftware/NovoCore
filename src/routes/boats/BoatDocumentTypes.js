const path = require("path");
const BoatDocumentTypes = require(path.resolve(
  __dirname,
  "../../controllers/boats/BoatDocumentTypes"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/boat-document-types/",
    BoatDocumentTypes.GetBoatDocumentTypes(...instances)
  );

  app.use(router);
};
