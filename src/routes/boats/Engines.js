const path = require("path");
const Engines = require(path.resolve(
  __dirname,
  "../../controllers/boats/Engines"
));
const Schema = require(path.resolve(__dirname, "../../schemas/boats/Engines"));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/:name/engines/",
    validate({ params: Schema.ParamsGetEngines }),
    Engines.GetEngines(...instances)
  );
  router.post(
    "/api/boats/:name/engine/",
    validate({ params: Schema.ParamsPostEngine, body: Schema.BodyPostEngine }),
    Engines.PostEngine(...instances)
  );
  router.put(
    "/api/boats/:name/engines/:id",
    validate({ params: Schema.ParamsPutEngine, body: Schema.BodyPutEngine }),
    Engines.PutEngine(...instances)
  );
  router.delete(
    "/api/boats/:name/engines/:id",
    validate({ params: Schema.ParamsDeleteEngine }),
    Engines.DeleteEngine(...instances)
  );

  app.use(router);
};
