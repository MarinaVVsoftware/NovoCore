const path = require("path");
const Engines = require(path.resolve(
  __dirname,
  "../../controllers/boats/Engines"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/boats/:name/engines/", Engines.GetEngines(...instances));
  router.post("/api/boats/:name/engine/", Engines.PostEngine(...instances));
  router.put("/api/boats/:name/engines/:id", Engines.PutEngine(...instances));
  router.delete(
    "/api/boats/:name/engines/:id",
    Engines.DeleteEngine(...instances)
  );

  app.use(router);
};
