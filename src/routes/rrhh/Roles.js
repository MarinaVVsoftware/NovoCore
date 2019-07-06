const path = require("path");
const Roles = require(path.resolve(__dirname, "../../controllers/rrhh/Roles"));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/rrhh/Roles"
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

  router.get("/api/users/roles/", Roles.GetRoles(...instances));
  router.put(
    "/api/users/roles/:name",
    validate({
      params: Schema.ParamsPutRolByName,
      body: Schema.BodyPutUserByName
    }),
    Roles.PutRolByName(...instances)
  );
  router.delete(
    "/api/users/roles/:name",
    validate({
      params: Schema.ParamsDeleteRolByName
    }),
    Roles.DeleteRolByName(...instances)
  );

  app.use(router);
};
