const path = require("path");
const CableTypes = require(path.resolve(
  __dirname,
  "../../controllers/boats/CableTypes"
));

module.exports = (app, router, validate, mysqlConnection) => {
  router.get("/api/cable-types/", CableTypes.GetCableTypes(mysqlConnection));

  app.use(router);
};
