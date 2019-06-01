/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const Boats = require(path.resolve(__dirname, "../../controllers/boats/Boats"));
const Schema = require(path.resolve(__dirname, "../../schemas/boats/Boats"));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  /* Rutas de Boats */
  router.get(
    "/api/clients/:id/boats/",
    validate({ params: Schema.ParamsGetBoatsByClient }),
    Boats.GetBoatsByClient(...instances)
  );
  router.put(
    "/api/clients/:id/boats/:name",
    validate({ params: Schema.ParamsPutBoat, body: Schema.BodyPutBoat }),
    Boats.PutBoat(...instances)
  );
  router.patch(
    "/api/clients/:id/boats/:name",
    validate({ params: Schema.ParamsPatchBoat, body: Schema.BodyPatchBoat }),
    Boats.PatchBoat(...instances)
  );
  router.delete("/api/clients/:id/boats/:name", Boats.DeleteBoat(...instances));

  app.use(router);
};
