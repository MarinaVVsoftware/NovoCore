/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const Boats = require(path.resolve(__dirname, "../controllers/Boats/Boats"));
const CableTypes = require(path.resolve(
  __dirname,
  "../controllers/Boats/CableTypes"
));
const SocketTypes = require(path.resolve(
  __dirname,
  "../controllers/Boats/SocketTypes"
));
const SlipTypes = require(path.resolve(
  __dirname,
  "../controllers/Boats/SlipTypes"
));
const BoatDocumentTypes = require(path.resolve(
  __dirname,
  "../controllers/Boats/BoatDocumentTypes"
));
const Slips = require(path.resolve(__dirname, "../controllers/Boats/Slips"));
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
  router.put(
    "/api/clients/:id/boats/:name",
    validate({ params: Schema.ParamsPutBoat, body: Schema.BodyPutBoat }),
    Boats.PutBoat(mysqlConnection)
  );
  router.delete(
    "/api/clients/:id/boats/:name",
    Boats.DeleteBoat(mysqlConnection)
  );

  /* Rutas para traer las tablas débiles */
  router.get("/api/cable-types/", CableTypes.GetCableTypes(mysqlConnection));
  router.get("/api/socket-types/", SocketTypes.GetSocketTypes(mysqlConnection));
  router.get("/api/slip-types/", SlipTypes.GetSlipTypes(mysqlConnection));
  router.get("/api/slips/", Slips.GetSlips(mysqlConnection));
  router.get(
    "/api/boat-document-types/",
    BoatDocumentTypes.GetBoatDocumentTypes(mysqlConnection)
  );

  app.use(router);
};
