// Routes
const path = require("path");
const ElectronicWallet = require(path.resolve(
  __dirname,
  "../../controllers/clients//ElectronicWallet"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/clients/ElectronicWallet"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/clients/ElectronicWallet"
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
    "/api/clients/:id/electronic-wallet/",
    validate({ params: Schema.ParamsGetElectronicWallet }),
    ElectronicWallet.GetElectronicWallet(
      ...instances,
      ErrorSchema.GetElectronicWallet
    )
  );
  router.post(
    "/api/clients/:id/electronic-wallet/marina",
    validate({
      params: Schema.ParamsPostElectronicWalletMovement,
      body: Schema.BodyPostElectronicWalletMovement
    }),
    ElectronicWallet.PostElectronicWalletMovement(...instances)
  );
  router.patch(
    "/api/clients/:id/electronic-wallet/marina",
    validate({
      params: Schema.ParamsPatchMarinaAmount,
      body: Schema.BodyPatchMarinaAmount
    }),
    ElectronicWallet.PatchMarinaAmount(
      ...instances,
      ErrorSchema.PatchMarinaAmount
    )
  );

  app.use(router);
};
