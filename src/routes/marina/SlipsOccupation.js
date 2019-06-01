const path = require("path");
const SlipOccupations = require(path.resolve(
  __dirname,
  "../../controllers/marina/SlipOccupations"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/marina/SlipsOccupation"
));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
  const instances = [newError, Query, mysqlConnection];

  router.get(
    "/api/marina/slip-occupations/",
    SlipOccupations.GetSlipOccupations(...instances)
  );
  router.post(
    "/api/marina/slip-occupations/",
    validate({
      body: Schema.BodyPostSlipsOccupation
    }),
    SlipOccupations.PostSlipOccupations(...instances)
  );
  router.put(
    "/api/marina/slip-occupations/:id",
    validate({
      params: Schema.ParamsPutSlipsOccupation,
      body: Schema.BodyPutSlipsOccupation
    }),
    SlipOccupations.PutSlipOccupations(...instances)
  );
  router.delete(
    "/api/marina/slip-occupations/:id",
    validate({
      params: Schema.ParamsDeleteSlipsOccupation
    }),
    SlipOccupations.DeleteSlipOccupations(...instances)
  );

  app.use(router);
};
