const path = require("path");
const SocialReasons = require(path.resolve(
  __dirname,
  "../../controllers/clients/SocialReasons"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/clients/SocialReasons"
));
const ErrorSchema = require(path.resolve(
  __dirname,
  "../../schemas/errors/clients/SocialReasons"
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
    "/api/clients/:id/social-reasons/",
    validate({ params: Schema.ParamsGetSocialReasons }),
    SocialReasons.GetSocialReasons(...instances, ErrorSchema.GetSocialReasons)
  );
  router.put(
    "/api/clients/:id/social-reasons/:rfc",
    validate({
      params: Schema.ParamsPutSocialReason,
      body: Schema.BodyPutSocialReason
    }),
    SocialReasons.PutSocialReason(...instances, ErrorSchema.PutSocialReason)
  );
  router.delete(
    "/api/clients/:id/social-reasons/:rfc",
    validate({
      params: Schema.ParamsDeleteSocialReason
    }),
    SocialReasons.DeleteSocialReason(
      ...instances,
      ErrorSchema.DeleteSocialReason
    )
  );

  app.use(router);
};
