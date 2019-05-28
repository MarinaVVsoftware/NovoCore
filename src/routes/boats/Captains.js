const path = require("path");
const Captains = require(path.resolve(
  __dirname,
  "../../controllers/boats/Captains"
));

const Schema = require(path.resolve(__dirname, "../../schemas/boats/Captains"));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/:name/captain/",
    validate({ params: Schema.ParamsGetCaptain }),
    Captains.GetCaptain(...instances)
  );
  router.put(
    "/api/boats/:name/captain/",
    validate({ params: Schema.ParamsPutCaptain, body: Schema.BodyPutCaptain }),
    Captains.PutCaptain(...instances)
  );
  router.delete(
    "/api/boats/:name/captain/",
    validate({ params: Schema.ParamsDeleteCaptain }),
    Captains.DeleteCaptain(...instances)
  );

  app.use(router);
};
