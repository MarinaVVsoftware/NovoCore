const path = require("path");
const Notifications = require(path.resolve(
  __dirname,
  "../../controllers/marina/Notifications"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/Notifications"
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
    "/api/marina/notifications/",
    Notifications.GetNotifications(...instances)
  );
  router.get(
    "/api/marina/notifications/:quotation",
    validate({ params: Schema.ParamsGetNotificationByQuotation }),
    Notifications.GetNotificationsByQuotation(...instances)
  );
  router.post(
    "/api/marina/notifications/:quotation",
    validate({
      params: Schema.ParamsPostNotification,
      body: Schema.BodyPostNotification
    }),
    Notifications.PostNotification(...instances)
  );
  router.patch(
    "/api/marina/notifications/:quotation/:notification",
    validate({
      params: Schema.ParamsPatchNotification,
      body: Schema.BodyPatchNotification
    }),
    Notifications.PatchNotification(...instances)
  );
  router.delete(
    "/api/marina/notifications/:quotation/:notification",
    validate({ params: Schema.ParamsDeleteNotification }),
    Notifications.DeleteNotification(...instances)
  );

  app.use(router);
};
