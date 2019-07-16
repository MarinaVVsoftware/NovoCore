const path = require("path");
const MarinaMooringTariff = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaMooringTariff"
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

  router.get(
    "/api/marina/mooring-rates/",
    MarinaMooringTariff.GetTariff(...instances)
  );
  router.post(
    "/api/marina/mooring-rates/:type",
    MarinaMooringTariff.PostTariff(...instances)
  );
  router.put(
    "/api/marina/mooring-rates/:type/:id",
    MarinaMooringTariff.PutTariff(...instances)
  );
  router.delete(
    "/api/marina/mooring-rates/:type/:id",
    MarinaMooringTariff.DeleteTariff(...instances)
  );

  app.use(router);
};
