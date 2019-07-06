// Routes
const path = require("path");
const MarinaPaymentTypes = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaPaymentTypes"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaPaymentTypes"
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
    "/api/marina/quotations/payment-type/read",
    MarinaPaymentTypes.Read(...instances)
  );
  router.delete(
    "/api/marina/quotations/payment-type/erase",
    validate({ body: Schema.erase }),
    MarinaPaymentTypes.Erase(...instances)
  );
  router.post(
    "/api/marina/quotations/payment-type/create",
    validate({ body: Schema.create }),
    MarinaPaymentTypes.Create(...instances)
  );
  router.put(
    "/api/marina/quotations/payment-type/update",
    validate({ body: Schema.update }),
    MarinaPaymentTypes.Update(...instances)
  );

  app.use(router);
};
