// Notifications - Controller
const Notifications = {};

Notifications.GetNotifications = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetNotifications");
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
      res.status(200).send("GetNotificationsByQuotation");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Notifications.PostNotification = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const incident = req.body.incident;
      Query(mysqlConnection, "CALL SP_Incidents_PostIncident(?,?,?,?);", [
        decodeURIComponent(req.params.name),
        incident.incidentTypeId,
        incident.title,
        incident.description
      ])
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
      res.status(200).send("PutNotification");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Notifications.DeleteNotification = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteNotification");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Notifications;
