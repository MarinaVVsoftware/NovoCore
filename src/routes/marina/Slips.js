const path = require("path");
const Slips = require(path.resolve(
  __dirname,
  "../../controllers/marina/Slips"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/marina/slips/", Slips.GetSlips(...instances));

  app.use(router);
};
