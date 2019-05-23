// Routes
const Clients = require("../controllers/Clients");
const ClientsSchema = require("../schemas/ClientsSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
  router.get("/api/Clients/Read", Clients.Read(mysqlConnection));
  router.delete(
    "/api/Clients/Erase",
    validate({ body: ClientsSchema.erase }),
    Clients.Erase(mysqlConnection)
  );
  router.patch(
    "/api/Clients/Delete",
    validate({ body: ClientsSchema.delete }),
    Clients.Delete(mysqlConnection)
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
