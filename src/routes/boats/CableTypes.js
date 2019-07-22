const path = require("path");
const CableTypes = require(path.resolve(
  __dirname,
  "../../controllers/boats/CableTypes"
));

module.exports = (
  app,
  router,
  newError,
  Query,
  Fetch,
  validate,
  mysqlConnection,
  multer,
  dropbox,
  redis,
  redisHandler
) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/boats/cable-types/", CableTypes.GetCableTypes(...instances));

  app.use(router);
};
