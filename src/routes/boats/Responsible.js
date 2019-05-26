const path = require("path");
const Responsible = require(path.resolve(
  __dirname,
  "../../controllers/boats/Responsible"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/boats/:name/responsable/",
    Responsible.GetResponsable(...instances)
  );
  router.put(
    "/api/boats/:name/responsable/",
    Responsible.PutResponsable(...instances)
  );
  router.delete(
    "/api/boats/:name/responsable/",
    Responsible.DeleteResponsable(...instances)
  );

  app.use(router);
};
