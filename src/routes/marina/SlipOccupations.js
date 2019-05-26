const path = require("path");
const SlipOccupations = require(path.resolve(
  __dirname,
  "../../controllers/marina/SlipOccupations"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/marina/slip-occupations/",
    SlipOccupations.GetSlipOccupations(...instances)
  );
  router.post(
    "/api/marina/slip-occupations/",
    SlipOccupations.PostSlipOccupations(...instances)
  );
  router.put(
    "/api/marina/slip-occupations/:id",
    SlipOccupations.PutSlipOccupations(...instances)
  );
  router.delete(
    "/api/marina/slip-occupations/:id",
    SlipOccupations.DeleteSlipOccupations(...instances)
  );

  app.use(router);
};
