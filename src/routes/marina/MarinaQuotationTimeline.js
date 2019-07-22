const path = require("path");
const MarinaQuotationTimeline = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationTimeline"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaQuotationTimeline"
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
    "/api/marina/quotation/:id/timeline/",
    validate({ params: Schema.ParamsGetTimelineByQuotation }),
    MarinaQuotationTimeline.GetTimelineByQuotation(...instances)
  );

  app.use(router);
};
