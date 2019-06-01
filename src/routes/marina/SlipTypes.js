const path = require("path");
const SlipTypes = require(path.resolve(
  __dirname,
  "../../controllers/marina/SlipTypes"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/marina/slip-types/", SlipTypes.GetSlipTypes(...instances));

  app.use(router);
};
