// Routes
const path = require("path");
const MarinaQuotationServices = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationServices"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/marina/MarinaQuotationServices"
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
    "/api/marina/quotations/services/read",
    MarinaQuotationServices.Read(...instances)
  );
  router.delete(
    "/api/marina/quotations/services/erase",
    validate({ body: Schema.erase }),
    MarinaQuotationServices.Erase(...instances)
  );
  router.patch(
    "/api/marina/quotations/services/delete",
    validate({ body: Schema.erase }),
    MarinaQuotationServices.Delete(...instances)
  );
  router.post(
    "/api/marina/quotations/services/create",
    validate({ body: Schema.create }),
    MarinaQuotationServices.Create(...instances)
  );
  router.put(
    "/api/marina/quotations/services/update",
    validate({ body: Schema.update }),
    MarinaQuotationServices.Update(...instances)
  );

  app.use(router);
};
