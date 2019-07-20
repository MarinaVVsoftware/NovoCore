const path = require("path");
const MarinaQuotationStatus = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationStatus"
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
    "/api/marina/quotation-status/",
    MarinaQuotationStatus.GetQuotationStatus(...instances)
  );

  app.use(router);
};
