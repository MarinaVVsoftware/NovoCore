const path = require("path");
const BoatElectricity = require(path.resolve(
  __dirname,
  "../../controllers/boats/BoatElectricity"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/boats/BoatElectricity"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/:name/boat-electricity/",
    validate({
      params: Schema.ParamsGetBoatElectricity
    }),
    BoatElectricity.GetBoatElectricity(...instances)
  );
  router.post(
    "/api/boats/:name/boat-electricity/",
    validate({
      params: Schema.ParamsPostBoatElectricity,
      body: Schema.BodyPostBoatElectricity
    }),
    BoatElectricity.PostBoatElectricity(...instances)
  );
  router.put(
    "/api/boats/:name/boat-electricity/:id",
    validate({
      params: Schema.ParamsPutBoatElectricity,
      body: Schema.BodyPutBoatElectricity
    }),
    BoatElectricity.PutBoatElectricity(...instances)
  );
  router.delete(
    "/api/boats/:name/boat-electricity/:id",
    validate({
      params: Schema.ParamsDeleteBoatElectricity
    }),
    BoatElectricity.DeleteBoatElectricity(...instances)
  );

  app.use(router);
};
