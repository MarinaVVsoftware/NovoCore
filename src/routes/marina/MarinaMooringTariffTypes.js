const path = require("path");
const MarinaMooringTariffTypes = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaMooringTariffTypes"
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

  router.get(
    "/api/marina/mooring-rate-types/",
    MarinaMooringTariffTypes.GetTariffTypes(...instances)
  );

  app.use(router);
};
