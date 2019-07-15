const path = require("path");
const Notifications = require(path.resolve(
  __dirname,
  "../../controllers/marina/Notifications"
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
    "/api/marina/notifications/",
    Notifications.GetNotifications(...instances)
  );
  router.get(
    "/api/marina/notifications/:quotation",
    Notifications.GetNotificationsByQuotation(...instances)
  );
  router.post(
    "/api/marina/notifications/:quotation",
    Notifications.PostNotification(...instances)
  );
  router.patch(
    "/api/marina/notifications/:quotation/:notification",
    Notifications.PatchNotification(...instances)
  );
  router.delete(
    "/api/marina/notifications/:quotation",
    Notifications.DeleteNotification(...instances)
  );

  app.use(router);
};
