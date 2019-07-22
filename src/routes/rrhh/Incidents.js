const path = require("path");
const Roles = require(path.resolve(
  __dirname,
  "../../controllers/rrhh/Incidents"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/rrhh/Incidents"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/rrhh/Incidents"
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
    "/api/users/:name/incidents/",
    validate({
      params: Schema.ParamsGetIncidentsByUser
    }),
    Roles.GetIncidentsByUser(...instances, ErrorSchema.GetIncidentsByUser)
  );
  router.post(
    "/api/users/:name/incidents/",
    validate({
      params: Schema.ParamsPostIncidentByUser,
      body: Schema.BodyPostIncidentByUser
    }),
    Roles.PostIncidentByUser(...instances, ErrorSchema.PostIncidentByUser)
  );
  router.put(
    "/api/users/:name/incidents/:id",
    validate({
      params: Schema.ParamsPutIncidentByUser,
      body: Schema.BodyPutIncidentByUser
    }),
    Roles.PutIncidentByUser(...instances, ErrorSchema.PutIncidentByUser)
  );
  router.delete(
    "/api/users/:name/incidents/:id",
    validate({
      params: Schema.ParamsDeleteIncidentByUser
    }),
    Roles.DeleteIncidentByUser(...instances, ErrorSchema.DeleteIncidentByUser)
  );

  app.use(router);
};
