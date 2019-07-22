const path = require("path");
const NotificationsTypes = require(path.resolve(
  __dirname,
  "../../controllers/marina/NotificationTypes"
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
    "/api/marina/notification-types/",
    NotificationsTypes.GetNotificationTypes(...instances)
  );

  app.use(router);
};
