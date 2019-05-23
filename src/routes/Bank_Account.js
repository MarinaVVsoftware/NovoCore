// Routes
const Bank_Account = require("../controllers/Bank_Account");
const Bank_AccountSchema = require("../schemas/Bank_AccountSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
  router.get("/api/Bank_Account/Read", Bank_Account.Read(mysqlConnection));
  router.delete(
    "/api/Bank_Account/Erase",
    validate({ body: Bank_AccountSchema.erase }),
    Bank_Account.Erase(mysqlConnection)
  );
  router.patch(
    "/api/Bank_Account/Delete",
    validate({ body: Bank_AccountSchema.delete }),
    Bank_Account.Delete(mysqlConnection)
  );
  router.post(
    "/api/Bank_Account/Create",
    validate({ body: Bank_AccountSchema.create }),
    Bank_Account.Create(mysqlConnection)
  );
  router.put(
    "/api/Bank_Account/Update",
    validate({ body: Bank_AccountSchema.update }),
    Bank_Account.Update(mysqlConnection)
  );

  app.use(router);
};
