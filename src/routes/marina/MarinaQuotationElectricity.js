// Routes
const path = require("path");
const MarinaQuotationElectricity = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationElectricity"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaQuotationElectricity"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/marina/MarinaQuotationElectricity"
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
    "/api/marina/quotations/:id/electricity",
    validate({ params: Schema.ParamsGetElectricity }),
    MarinaQuotationElectricity.GetElectricity(...instances)
  );
  router.put(
    "/api/marina/quotations/:id/electricity",
    validate({
      params: Schema.ParamsPutElectricity,
      body: Schema.BodyPutElectricity
    }),

    MarinaQuotationElectricity.PutElectricity(...instances)
  );

  app.use(router);
};
