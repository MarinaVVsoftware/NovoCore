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
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/users/read", Users.Read(...instances));
  router.post(
    "/api/users/read-id",
    validate({ body: Schema.email }),
    Users.ReadId(...instances)
  );
  router.delete(
    "/api/users/delete",
    validate({ body: Schema.email }),
    Users.Delete(...instances)
  );
  router.post(
    "/api/users/create",
    validate({ body: Schema.create }),
    Users.Create(...instances)
  );
  router.put(
    "/api/users/update",
    validate({ body: Schema.update }),
    Users.Update(...instances)
  );
  router.get(
    "/api/users/permissions",
    validate({ body: Schema.email }),
    Users.Permission(...instances)
  );

  app.use(router);
};
