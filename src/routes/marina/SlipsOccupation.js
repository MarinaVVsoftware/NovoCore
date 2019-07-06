const path = require("path");
const SlipsOccupation = require(path.resolve(
  __dirname,
  "../../controllers/marina/SlipsOccupation"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/marina/SlipsOccupation"
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
    "/api/marina/slips-occupation/",
    SlipsOccupation.GetSlipsOccupation(...instances)
  );
  router.get(
    "/api/marina/slips-occupation/:quotation",
    validate({
      params: Schema.ParamsGetSlipsOccupationByQuotation
    }),
    SlipsOccupation.GetSlipsOccupationByQuotation(...instances)
  );
  router.post(
    "/api/marina/slips-occupation/",
    // validate({
    //   body: Schema.BodyPostSlipsOccupation
    // }),
    SlipsOccupation.PostSlipsOccupation(app.get("host"), ...instances)
  );
  router.put(
    "/api/marina/slips-occupation/:quotation",
    validate({
      params: Schema.ParamsPutSlipsOccupation,
      body: Schema.BodyPutSlipsOccupation
    }),
    SlipsOccupation.PutSlipsOccupation(...instances)
  );

  app.use(router);
};
