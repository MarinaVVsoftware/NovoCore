/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const Boats = require(path.resolve(__dirname, "../../controllers/boats/Boats"));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/boats/BoatSchema"
));

module.exports = (app, router, validate, mysqlConnection) => {
  /* Rutas de Boats */
  router.get(
    "/api/clients/:id/boats/",
    validate({ params: Schema.ParamsGetBoatsByClient }),
    Boats.GetBoatsByClient(mysqlConnection)
  );
  router.put(
    "/api/clients/:id/boats/:name",
    validate({ params: Schema.ParamsPutBoat, body: Schema.BodyPutBoat }),
    Boats.PutBoat(mysqlConnection)
  );
  router.delete(
    "/api/clients/:id/boats/:name",
    Boats.DeleteBoat(mysqlConnection)
  );

  app.use(router);
};
