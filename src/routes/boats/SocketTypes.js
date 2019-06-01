const path = require("path");
const SocketTypes = require(path.resolve(
  __dirname,
  "../../controllers/boats/SocketTypes"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/socket-types/",
    SocketTypes.GetSocketTypes(...instances)
  );

  app.use(router);
};
