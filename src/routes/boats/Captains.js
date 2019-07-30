const path = require("path");
const Captains = require(path.resolve(
  __dirname,
  "../../controllers/boats/Captains"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/boats/Captains"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/boats/Captains"
));

module.exports = (
  app,
  router,
  newError,
  Query,
  Fetch,
  validate,
  mysqlConnection,
  multer,
  dropbox,
  redis,
  redisHandler
) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/clients/:id/boats/:name/captain/",
    validate({ params: Schema.ParamsGetCaptain }),
    Captains.GetCaptain(...instances, ErrorSchema.GetCaptain)
  );
  router.put(
    "/api/clients/:id/boats/:name/captain/",
    validate({ params: Schema.ParamsPutCaptain, body: Schema.BodyPutCaptain }),
    Captains.PutCaptain(...instances, ErrorSchema.PutCaptain)
  );
  router.delete(
    "/api/clients/:id/boats/:name/captain/",
    validate({ params: Schema.ParamsDeleteCaptain }),
    Captains.DeleteCaptain(...instances, ErrorSchema.DeleteCaptain)
  );

  app.use(router);
};
