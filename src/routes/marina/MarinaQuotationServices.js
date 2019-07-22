const path = require("path");
const MarinaQuotationServices = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationServices"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaQuotationServices"
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
    "/api/marina/quotation-services/",
    MarinaQuotationServices.GetMarinaQuotationServices(...instances)
  );
  router.post(
    "/api/marina/quotation-services/",
    validate({ body: Schema.BodyPostMarinaQuotationService }),
    MarinaQuotationServices.PostMarinaQuotationService(...instances)
  );

  app.use(router);
};
