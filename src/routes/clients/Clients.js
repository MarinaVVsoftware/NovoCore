// Routes
const path = require("path");
const Clients = require(path.resolve(
  __dirname,
  "../../controllers/clients/Clients"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/clients/Clients"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/clients/", Clients.GetClients(...instances));
  router.get(
    "/api/clients/:id/",
    validate({ params: Schema.ParamsGetClientById }),
    Clients.GetClientById(...instances)
  );
  router.post(
    "/api/clients/",
    validate({ body: Schema.BodyPostClient }),
    Clients.PostClient(...instances)
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
