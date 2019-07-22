const path = require("path");
const Ranks = require(path.resolve(__dirname, "../../controllers/rrhh/Ranks"));

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

  router.get("/api/users/ranks/", Ranks.GetRanks(...instances));

  app.use(router);
};
