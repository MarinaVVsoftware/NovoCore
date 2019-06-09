// Routes
const path = require("path");
const MarinaPayments = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaPayments"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/marina/MarinaPayments"
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
    "/api/marina/quotations/payment/read",
    MarinaPayments.Read(...instances)
  );
  router.delete(
    "/api/marina/quotations/payment/erase",
    validate({ body: Schema.erase }),
    MarinaPayments.Erase(...instances)
  );
  router.post(
    "/api/marina/quotations/payment/create",
    validate({ body: Schema.create }),
    MarinaPayments.Create(...instances)
  );
  router.put(
    "/api/marina/quotations/payment/update",
    validate({ body: Schema.update }),
    MarinaPayments.Update(...instances)
  );

  app.use(router);
};
