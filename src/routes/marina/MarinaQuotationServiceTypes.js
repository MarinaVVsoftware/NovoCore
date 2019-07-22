const path = require("path");
const MarinaQuotationServiceTypes = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationServiceTypes"
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
    "/api/marina/quotation-service-types/",
    MarinaQuotationServiceTypes.GetMarinaQuotationServiceTypes(...instances)
  );

  app.use(router);
};
