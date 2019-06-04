const MarinaQuotationTimelineTypes = require("../../controllers/marina/MarinaQuotationTimelineTypes");

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/marina/timelinetypes/",
    MarinaQuotationTimelineTypes.GetTimelineTypes(...instances)
  );

  app.use(router);
};
