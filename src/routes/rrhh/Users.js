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

  router.get("/api/users/", Users.GetUsers(...instances));
  router.get("/api/users/:name", Users.GetUserByName(...instances));
  router.put("/api/users/:name", Users.PutUserByName(...instances));
  router.delete("/api/users/:name", Users.DeleteUserByName(...instances));

  app.use(router);
};
