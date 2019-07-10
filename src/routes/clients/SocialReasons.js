const path = require("path");
const SocialReasons = require(path.resolve(
  __dirname,
  "../../controllers/clients/SocialReasons"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/clients/SocialReasons"
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
    "/api/clients/:id/social-reasons/",
    validate({ params: Schema.ParamsGetSocialReasons }),
    SocialReasons.GetSocialReasons(...instances)
  );
  router.put(
    "/api/clients/:id/social-reasons/:rfc",
    validate({
      params: Schema.ParamsPutSocialReason,
      body: Schema.BodyPutSocialReason
    }),
    SocialReasons.PutSocialReason(...instances)
  );
  router.delete(
    "/api/clients/:id/social-reasons/:rfc",
    validate({
      params: Schema.ParamsDeleteSocialReason
    }),
    SocialReasons.DeleteSocialReason(...instances)
  );

  app.use(router);
};
