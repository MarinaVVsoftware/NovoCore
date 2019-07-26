const path = require("path");
const Users = require(path.resolve(__dirname, "../../controllers/rrhh/Users"));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/rrhh/Users"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/rrhh/Users"
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
    "/api/users/",
    // redisHandler.ReadCache(redis, RedisSchema),
    Users.GetUsers(...instances)
    // redisHandler.WriteCache(redis, RedisSchema)
  );
  router.get(
    "/api/users/:email",
    validate({ params: Schema.ParamsGetUserByEmail }),
    Users.GetUserByEmail(...instances, ErrorSchema.GetUserByEmail)
    // redisHandler.WriteCache(redis, RedisSchema)
  );
  router.put(
    "/api/users/:name",
    validate({
      params: Schema.ParamsPutUserByName,
      body: Schema.BodyPutUserByName
    }),
    Users.PutUserByName(
      ...instances,
      ErrorSchema.PutUserByName,
      app.get("authcore")
    )
    // redisHandler.WriteCache(redis, RedisSchema)
  );
  router.delete(
    "/api/users/:email",
    validate({ params: Schema.ParamsDeleteUserByName }),
    Users.DeleteUserByName(
      ...instances,
      ErrorSchema.DeleteUserByName,
      app.get("authcore")
    )
    // redisHandler.WriteCache(redis, RedisSchema)
  );

  app.use(router);
};
