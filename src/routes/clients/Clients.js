// Routes
const path = require("path");
const Clients = require(path.resolve(
  __dirname,
  "../../controllers/clients/Clients"
));
const ClientsSchema = require(path.resolve(
  __dirname,
  "../../schemas/clients/Clients"
));

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/Clients/Read", Clients.Read(...instances));

  router.patch(
    "/api/Clients/Delete",
    validate({ body: ClientsSchema.delete }),
    Clients.Delete(...instances)
  );
  router.post(
    "/api/Clients/Create",
    validate({ body: ClientsSchema.create }),
    Clients.Create(mysqlConnection)
  );
  router.put(
    "/api/Clients/Update",
    validate({ body: ClientsSchema.update }),
    Clients.Update(mysqlConnection)
  );

  app.use(router);
};