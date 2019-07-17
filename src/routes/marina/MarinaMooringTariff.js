const path = require("path");
const MarinaMooringTariff = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaMooringTariff"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaMooringTariff"
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
  router.get(
    "/api/marina/mooring-rates/:type",
    validate({ params: Schema.ParamsGetTariffByType }),
    MarinaMooringTariff.GetTariffByType(...instances)
  );
  router.post(
    "/api/marina/mooring-rates/",
    validate({ body: Schema.BodyPostTariff }),
    MarinaMooringTariff.PostTariff(...instances)
  );
  router.put(
    "/api/marina/mooring-rates/:id",
    validate({
      params: Schema.ParamsPutTariff,
      body: Schema.BodyPutTariff
    }),
    MarinaMooringTariff.PutTariff(...instances)
  );
  router.delete(
    "/api/marina/mooring-rates/:id",
    validate({ params: Schema.ParamsDeleteTariff }),
    MarinaMooringTariff.DeleteTariff(...instances)
  );

  app.use(router);
};
