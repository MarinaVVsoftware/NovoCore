// Routes
const path = require("path");
const Clients = require(path.resolve(
  __dirname,
  "../../controllers/clients/Clients"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/clients/Clients"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/clients/Clients"
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

  router.get("/api/clients/", Clients.GetClients(...instances));
  router.get(
    "/api/clients/:id/",
    validate({ params: Schema.ParamsGetClientById }),
    Clients.GetClientById(...instances, ErrorSchema.GetClientById)
  );
  router.post(
    "/api/clients/",
    validate({ body: Schema.BodyPostClient }),
    Clients.PostClient(...instances, ErrorSchema.PostClient, app.get("host"))
  );
  router.put(
    "/api/clients/:id/",
    validate({ params: Schema.ParamsPutClient, body: Schema.BodyPutClient }),
    Clients.PutClient(...instances)
  );
  router.delete(
    "/api/clients/:id/",
    validate({ params: Schema.ParamsDeleteClientById }),
    Clients.DeleteClientById(...instances)
  );

  app.use(router);
};
