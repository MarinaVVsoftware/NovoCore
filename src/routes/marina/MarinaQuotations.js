// Routes
const path = require("path");
const MarinaQuotations = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotations"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaQuotations"
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
    "/api/marina/quotations/:id/",
    validate({ params: Schema.ParamsGetQuotationById }),
    MarinaQuotations.GetQuotationById(...instances)
  );
  router.get(
    "/api/marina/quotations/",
    validate({ query: Schema.QueryGetQuotationsByGroup }),
    MarinaQuotations.GetQuotationsByGroup(...instances)
  );
  router.post(
    "/api/marina/quotations/",
    validate({ body: Schema.BodyPostQuotation }),
    MarinaQuotations.PostQuotation(...instances)
  );

  app.use(router);
};
