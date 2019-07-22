const path = require("path");
const NotificationStatus = require(path.resolve(
  __dirname,
  "../../controllers/marina/NotificationStatus"
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
    "/api/marina/notification-status/",
    NotificationStatus.GetNotificationStatus(...instances)
  );

  app.use(router);
};
