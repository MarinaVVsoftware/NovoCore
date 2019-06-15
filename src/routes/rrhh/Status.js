const path = require("path");
const Status = require(path.resolve(
  __dirname,
  "../../controllers/rrhh/Status"
));

module.exports = (
  app,
  router,
  newError,
  Query,
  validate,
  mysqlConnection,
  multer,
  dropbox,
  redis,
  redisHandler
) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/users/status/", Status.GetStatus(...instances));

  app.use(router);
};
