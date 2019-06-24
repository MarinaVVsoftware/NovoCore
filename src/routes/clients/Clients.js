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

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/Clients/Read", Clients.Read(...instances));
  router.post(
    "/api/clients/",
    validate({ body: Schema.BodyPostClient }),
    Clients.PostClient(...instances)
  );
  router.patch("/api/Clients/Delete", Clients.Delete(...instances));
  router.put("/api/Clients/Update", Clients.Update(mysqlConnection));

  app.use(router);
};
