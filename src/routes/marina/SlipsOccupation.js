const path = require("path");
const SlipsOccupation = require(path.resolve(
  __dirname,
  "../../controllers/marina/SlipsOccupation"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/marina/SlipsOccupation"
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
    "/api/marina/slip-occupations/",
    SlipsOccupation.GetSlipsOccupation(...instances)
  );
  router.post(
    "/api/marina/slip-occupations/",
    validate({
      body: Schema.BodyPostSlipsOccupation
    }),
    SlipsOccupation.PostSlipsOccupation(...instances)
  );
  router.put(
    "/api/marina/slip-occupations/:id",
    validate({
      params: Schema.ParamsPutSlipsOccupation,
      body: Schema.BodyPutSlipsOccupation
    }),
    SlipsOccupation.PutSlipsOccupation(...instances)
  );
  router.delete(
    "/api/marina/slip-occupations/:id",
    validate({
      params: Schema.ParamsDeleteSlipsOccupation
    }),
    SlipsOccupation.DeleteSlipsOccupation(...instances)
  );

  app.use(router);
};
