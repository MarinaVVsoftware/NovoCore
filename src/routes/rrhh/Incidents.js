const path = require("path");
const Roles = require(path.resolve(
  __dirname,
  "../../controllers/rrhh/Incidents"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/rrhh/Incidents"
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
    "/api/users/:name/incidents/",
    validate({
      params: Schema.ParamsGetIncidentsByUser
    }),
    Roles.GetIncidentsByUser(...instances)
  );
  router.post(
    "/api/users/:name/incidents/",
    validate({
      params: Schema.ParamsPostIncidentByUser,
      body: Schema.BodyPostIncidentByUser
    }),
    Roles.PostIncidentByUser(...instances)
  );
  router.put(
    "/api/users/:name/incidents/:id",
    validate({
      params: Schema.ParamsPutIncidentByUser,
      body: Schema.BodyPutIncidentByUser
    }),
    Roles.PutIncidentByUser(...instances)
  );
  router.delete(
    "/api/users/:name/incidents/:id",
    validate({
      params: Schema.ParamsDeleteIncidentByUser
    }),
    Roles.DeleteIncidentByUser(...instances)
  );

  app.use(router);
};
