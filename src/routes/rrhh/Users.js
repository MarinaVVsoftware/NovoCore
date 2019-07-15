const path = require("path");
const Users = require(path.resolve(__dirname, "../../controllers/rrhh/Users"));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/rrhh/Users"
));
const RedisSchema = require(path.resolve(
  __dirname,
  "../../schemas/redis/rrhh/Users"
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
    // redisHandler.ReadCache(redis, RedisSchema),
    Users.GetUsers(...instances)
    // redisHandler.WriteCache(redis, RedisSchema)
  );
  router.get(
    "/api/users/:email",
    validate({ params: Schema.ParamsGetUserByEmail }),
    Users.GetUserByEmail(...instances)
    // redisHandler.WriteCache(redis, RedisSchema)
  );
  router.put(
    "/api/users/:name",
    validate({
      params: Schema.ParamsPutUserByName,
      body: Schema.BodyPutUserByName
    }),
    Users.PutUserByName(...instances)
    // redisHandler.WriteCache(redis, RedisSchema)
  );
  router.delete(
    "/api/users/:email",
    validate({ params: Schema.ParamsDeleteUserByName }),
    Users.DeleteUserByName(...instances)
    // redisHandler.WriteCache(redis, RedisSchema)
  );

  app.use(router);
};
