// Routes
const path = require("path");
const BankAccounts = require(path.resolve(
  __dirname,
  "../../controllers/clients/BankAccounts"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/clients/BankAccounts"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/clients/BankAccounts"
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
    "/api/clients/:id/bank-accounts/",
    validate({
      params: Schema.ParamsGetBankAccounts
    }),
    BankAccounts.GetBankAccounts(...instances)
  );
  router.put(
    "/api/clients/:id/bank-accounts/:number",
    validate({
      params: Schema.ParamsPutBankAccount,
      body: Schema.BodyPutBankAccount
    }),
    BankAccounts.PutBankAccount(...instances)
  );
  router.delete(
    "/api/clients/:id/bank-accounts/:number",
    validate({
      params: Schema.ParamsDeleteBankAccount
    }),
    BankAccounts.DeleteBankAccount(...instances)
  );

  app.use(router);
};
