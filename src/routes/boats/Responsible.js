const path = require("path");
const Responsible = require(path.resolve(
  __dirname,
  "../../controllers/boats/Responsible"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/boats/Responsible"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/:name/responsable/",
    validate({ params: Schema.ParamsGetResponsable }),
    Responsible.GetResponsable(...instances)
  );
  router.put(
    "/api/boats/:name/responsable/",
    validate({
      params: Schema.ParamsPutResponsable,
      body: Schema.BodyPostResponsable
    }),
    Responsible.PutResponsable(...instances)
  );
  router.delete(
    "/api/boats/:name/responsable/",
    validate({ params: Schema.ParamsDeleteResponsable }),
    Responsible.DeleteResponsable(...instances)
  );

  app.use(router);
};
