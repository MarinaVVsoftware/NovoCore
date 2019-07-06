const path = require("path");
const Engines = require(path.resolve(
  __dirname,
  "../../controllers/boats/Engines"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/boats/Engines"
));

module.exports = (
  app,
  router,
  newError,
  Query,
  validate,
  mysqlConnection,
  multer,
  dropbox,
  redis,
  redisHandler
) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/clients/:id/boats/:name/engines/",
    validate({ params: Schema.ParamsGetEngines }),
    Engines.GetEngines(...instances)
  );
  router.post(
    "/api/clients/:id/boats/:name/engine/",
    validate({ params: Schema.ParamsPostEngine, body: Schema.BodyPostEngine }),
    Engines.PostEngine(...instances)
  );
  router.put(
    "/api/clients/:id/boats/:name/engines/:engineid",
    validate({ params: Schema.ParamsPutEngine, body: Schema.BodyPutEngine }),
    Engines.PutEngine(...instances)
  );
  router.delete(
    "/api/clients/:id/boats/:name/engines/:engineid",
    validate({ params: Schema.ParamsDeleteEngine }),
    Engines.DeleteEngine(...instances)
  );

  app.use(router);
};
