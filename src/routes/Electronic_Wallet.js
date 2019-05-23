// Routes
const Electronic_Wallet = require("../controllers/Electronic_Wallet");
const Electronic_WalletSchema = require("../schemas/Electronic_WalletSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
  router.get(
    "/api/Electronic_Wallet/Read",
    Electronic_Wallet.Read(mysqlConnection)
  );
  router.delete(
    "/api/Electronic_Wallet/Erase",
    validate({ body: Electronic_WalletSchema.erase }),
    Electronic_Wallet.Erase(mysqlConnection)
  );
  router.patch(
    "/api/Electronic_Wallet/Delete",
    validate({ body: Electronic_WalletSchema.delete }),
    Electronic_Wallet.Delete(mysqlConnection)
  );
  router.post(
    "/api/Electronic_Wallet/Create",
    validate({ body: Electronic_WalletSchema.create }),
    Electronic_Wallet.Create(mysqlConnection)
  );
  router.put(
    "/api/Electronic_Wallet/Update",
    validate({ body: Electronic_WalletSchema.update }),
    Electronic_Wallet.Update(mysqlConnection)
  );

  app.use(router);
};
