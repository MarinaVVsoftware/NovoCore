/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const Boats = require(path.resolve(__dirname, "../controllers/Boats"));
const Schema = require(path.resolve(__dirname, "../schemas/BoatSchema"));

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
  router.get(
    "/api/clients/:id/boats/",
    validate({ params: Schema.ParamsGetBoatsByClient }),
    Boats.GetBoatsByClient(mysqlConnection)
  );
  router.put("/api/clients/:id/boats/:name", Boats.PutBoat(mysqlConnection));
  router.delete(
    "/api/clients/:id/boats/:name",
    Boats.DeleteBoat(mysqlConnection)
  );

  app.use(router);
};
