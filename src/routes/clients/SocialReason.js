// Routes
const path = require("path");
const Social_Reason = require(path.resolve(
  __dirname,
  "../../controllers/clients/SocialReason"
));
const Social_ReasonSchema = require(path.resolve(
  __dirname,
  "../../schemas/clients/SocialReason"
));

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
  router.get("/api/Social_Reason/Read", Social_Reason.Read(mysqlConnection));
  router.delete(
    "/api/Social_Reason/Erase",
    validate({ body: Social_ReasonSchema.erase }),
    Social_Reason.Erase(mysqlConnection)
  );
  router.patch(
    "/api/Social_Reason/Delete",
    validate({ body: Social_ReasonSchema.delete }),
    Social_Reason.Delete(mysqlConnection)
  );
  router.post(
    "/api/Social_Reason/Create",
    validate({ body: Social_ReasonSchema.create }),
    Social_Reason.Create(mysqlConnection)
  );
  router.put(
    "/api/Social_Reason/Update",
    validate({ body: Social_ReasonSchema.update }),
    Social_Reason.Update(mysqlConnection)
  );

  app.use(router);
};
