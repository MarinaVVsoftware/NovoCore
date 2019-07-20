// Notifications - Controller
const Notifications = {};

Notifications.GetNotifications = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Notifications_GetNotifications();")
        .then(result => res.status(200).send({ notifications: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Notifications.GetNotificationsByQuotation = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.quotation))
        next(newError("el param 'quotation' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_Notifications_GetNotificationsByQuotation(?);",
          [req.params.quotation]
        )
          .then(result => res.status(200).send({ notifications: result[0][0] }))
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Notifications.PostNotification = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const notification = req.body.notification;

      if (isNaN(req.params.quotation))
        next(newError("el param 'quotation' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_Notifications_PostNotification(?,?,?,?,?,?,?,?);",
          [
            notification.clientId,
            notification.notificationTypeId,
            notification.notificationStatusId,
            req.params.quotation,
            notification.title,
            notification.message,
            notification.creationResponsable,
            notification.dateToSend
          ]
        )
          .then(() => res.status(201).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Notifications.PatchNotification = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const notification = req.body.notification;

      if (isNaN(req.params.quotation))
        next(newError("el param 'quotation' no es un número válido.", 406));
      else if (isNaN(req.params.notification))
        next(newError("el param 'notification' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_Notifications_PatchNotification(?,?,?,?,?);",
          [
            req.params.quotation,
            req.params.notification,
            notification.title,
            notification.message,
            notification.dateToSend
          ]
        )
          .then(() => res.status(204).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Notifications.DeleteNotification = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.quotation))
        next(newError("el param 'quotation' no es un número válido.", 406));
      else if (isNaN(req.params.notification))
        next(newError("el param 'notification' no es un número válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_Notifications_DeleteNotification(?,?);",
          [req.params.quotation, req.params.notification]
        )
          .then(() => res.status(204).send())
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Notifications;
