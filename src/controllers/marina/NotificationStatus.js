// NotificationStatus - Controller
const NotificationStatus = {};

NotificationStatus.GetNotificationStatus = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      Query(
        mysqlConnection,
        "CALL SP_NotificationTypes_GetNotificationTypes();"
      )
        .then(result => res.status(200).send({ slipTypes: result[0][0] }))
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = NotificationStatus;
