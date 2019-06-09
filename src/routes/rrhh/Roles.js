const path = require("path");
const Roles = require(path.resolve(__dirname, "../../controllers/rrhh/Roles"));
const Schema = require(path.resolve(__dirname, "../../schemas/rrhh/Roles"));

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

  router.get("/api/roles/read", Roles.Read(mysqlConnection));
  router.delete(
    "/api/roles/erase",
    validate({ body: Schema.erase }),
    Roles.Erase(...instances)
  );
  router.post(
    "/api/roles/create",
    validate({ body: Schema.create }),
    Roles.Create(...instances)
  );
  router.put(
    "/api/roles/update",
    validate({ body: Schema.update }),
    Roles.Update(...instances)
  );

  app.use(router);
};
