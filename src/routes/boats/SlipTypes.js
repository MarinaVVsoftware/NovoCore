const path = require("path");
const SlipTypes = require(path.resolve(
  __dirname,
  "../../controllers/boats/SlipTypes"
));

module.exports = (app, router, validate, mysqlConnection) => {
  router.get("/api/slip-types/", SlipTypes.GetSlipTypes(mysqlConnection));

  app.use(router);
};
