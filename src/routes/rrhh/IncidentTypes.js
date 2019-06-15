const path = require("path");
const IncidentTypes = require(path.resolve(
  __dirname,
  "../../controllers/rrhh/IncidentTypes"
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
    "/api/users/incident-types/",
    IncidentTypes.GetIncidentTypes(...instances)
  );

  app.use(router);
};
