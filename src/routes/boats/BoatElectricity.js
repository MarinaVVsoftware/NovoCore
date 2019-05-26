const path = require("path");
const BoatElectricity = require(path.resolve(
  __dirname,
  "../../controllers/boats/BoatElectricity"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/:name/boat-electricity/",
    BoatElectricity.GetBoatElectricity(...instances)
  );
  router.post(
    "/api/boats/:name/boat-electricity/",
    BoatElectricity.PostBoatElectricity(...instances)
  );
  router.put(
    "/api/boats/:name/boat-electricity/:id",
    BoatElectricity.PutBoatElectricity(...instances)
  );
  router.delete(
    "/api/boats/:name/boat-electricity/:id",
    BoatElectricity.DeleteBoatElectricity(...instances)
  );

  app.use(router);
};
