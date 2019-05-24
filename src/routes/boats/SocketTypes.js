const path = require("path");
const SocketTypes = require(path.resolve(
  __dirname,
  "../../controllers/boats/SocketTypes"
));

module.exports = (app, router, validate, mysqlConnection) => {
  router.get("/api/socket-types/", SocketTypes.GetSocketTypes(mysqlConnection));

  app.use(router);
};
