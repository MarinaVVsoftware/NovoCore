const path = require("path");
const Slips = require(path.resolve(__dirname, "../../controllers/boats/Slips"));

module.exports = (app, router, mysqlConnection) => {
  router.get("/api/slips/", Slips.GetSlips(mysqlConnection));

  app.use(router);
};
