const path = require("path");
const Users = require(path.resolve(__dirname, "../../controllers/rrhh/Users"));
const Schema = require(path.resolve(__dirname, "../../schemas/rrhh/Users"));

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
  const instances = [newError, Query, mysqlConnection, app.get("authcore")];

  router.get("/api/users/", Users.GetUsers(...instances));
  router.get(
    "/api/users/:name",
    validate({ params: Schema.ParamsGetUserByName }),
    Users.GetUserByName(...instances)
  );
  router.put(
    "/api/users/:name",
    validate({
      params: Schema.ParamsPutUserByName,
      body: Schema.BodyPutUserByName
    }),
    Users.PutUserByName(...instances)
  );
  router.delete(
    "/api/users/:email",
    validate({ params: Schema.ParamsDeleteUserByName }),
    Users.DeleteUserByName(...instances)
  );

  app.use(router);
};
