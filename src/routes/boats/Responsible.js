const path = require("path");
const Responsible = require(path.resolve(
  __dirname,
  "../../controllers/boats/Responsible"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/boats/Responsible"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/boats/Responsible"
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
    "/api/clients/:id/boats/:name/responsable/",
    validate({ params: Schema.ParamsGetResponsable }),
    Responsible.GetResponsable(...instances, ErrorSchema.GetResponsable)
  );
  router.put(
    "/api/clients/:id/boats/:name/responsable/",
    validate({
      params: Schema.ParamsPutResponsable,
      body: Schema.BodyPostResponsable
    }),
    Responsible.PutResponsable(...instances, ErrorSchema.PutResponsable)
  );
  router.delete(
    "/api/clients/:id/boats/:name/responsable/",
    validate({ params: Schema.ParamsDeleteResponsable }),
    Responsible.DeleteResponsable(...instances, ErrorSchema.DeleteResponsable)
  );

  app.use(router);
};
