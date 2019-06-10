const path = require("path");
const MarinaQuotationTimelineTypes = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaQuotationTimelineTypes"
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
    "/api/marina/timeline-types/",
    MarinaQuotationTimelineTypes.GetTimelineTypes(...instances)
  );

  app.use(router);
};
