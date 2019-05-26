const path = require("path");
const Captains = require(path.resolve(
  __dirname,
  "../../controllers/boats/Captains"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get("/api/boats/:name/captain/", Captains.GetCaptain(...instances));
  router.put("/api/boats/:name/captain/", Captains.PutCaptain(...instances));
  router.delete(
    "/api/boats/:name/captain/",
    Captains.DeleteCaptain(...instances)
  );

  app.use(router);
};
