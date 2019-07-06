const path = require("path");
const Users = require(path.resolve(__dirname, "../../controllers/rrhh/Users"));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/rrhh/Users"
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
  const instances = [newError, Query, mysqlConnection, app.get("authcore")];

  router.get(
    "/api/users/",
    redisHandler.ReadCache(redis, "Users"),
    Users.GetUsers(...instances),
    redisHandler.WriteCache(redis, "Users")
  );
  router.get(
    "/api/users/:name",
    validate({ params: Schema.ParamsGetUserByName }),
    Users.GetUserByName(...instances),
    redisHandler.WriteCache(redis, "Users")
  );
  router.put(
    "/api/users/:name",
    validate({
      params: Schema.ParamsPutUserByName,
      body: Schema.BodyPutUserByName
    }),
    Users.PutUserByName(...instances),
    redisHandler.WriteCache(redis, "Users")
  );
  router.delete(
    "/api/users/:email",
    validate({ params: Schema.ParamsDeleteUserByName }),
    Users.DeleteUserByName(...instances),
    redisHandler.WriteCache(redis, "Users")
  );

  app.use(router);
};
