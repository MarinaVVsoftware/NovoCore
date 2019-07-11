// Routes
const path = require("path");
const ElectronicWalletHistoric = require(path.resolve(
  __dirname,
  "../../controllers/clients//ElectronicWalletHistoric"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/clients/ElectronicWalletHistoric"
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
    "/api/clients/:id/electronic-wallet-historic/",
    validate({ params: Schema.ParamsGetHistoric }),
    ElectronicWalletHistoric.GetHistoric(...instances)
  );

  app.use(router);
};
