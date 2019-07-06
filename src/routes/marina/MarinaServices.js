// Routes
const path = require("path");
const MarinaServices = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaServices"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/MarinaServices"
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

  router.get("/api/Marina-Service/Read", MarinaServices.Read(...instances));
  router.delete(
    "/api/Marina-Service/Erase",
    validate({ body: Schema.erase }),
    MarinaServices.Erase(...instances)
  );
  router.post(
    "/api/Marina-Service/Create",
    validate({ body: Schema.create }),
    MarinaServices.Create(...instances)
  );
  router.put(
    "/api/Marina-Service/Update",
    validate({ body: Schema.update }),
    MarinaServices.Update(...instances)
  );

  app.use(router);
};
