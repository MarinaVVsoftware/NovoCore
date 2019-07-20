// NotificationTypes - Controller
const NotificationTypes = {};

NotificationTypes.GetNotificationTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(
        mysqlConnection,
        "CALL SP_NotificationStatus_GetNotificationStatus();"
      )
        .then(result => res.status(200).send({ slipTypes: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = NotificationTypes;
