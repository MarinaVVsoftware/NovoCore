// Routes
const Electronic_Wallet_Historic = require("../controllers/Electronic_Wallet_Historic");
const Electronic_Wallet_HistoricSchema = require("../schemas/Electronic_Wallet_HistoricSchema");

var { Validator } = require("express-json-validator-middleware");
var validator = new Validator({ allErrors: true });
var validate = validator.validate;

module.exports = (app, router, mysqlConnection) => {
  router.get(
    "/api/Electronic_Wallet_Historic/Read",
    Electronic_Wallet_Historic.Read(mysqlConnection)
  );
  router.delete(
    "/api/Electronic_Wallet_Historic/Erase",
    validate({ body: Electronic_Wallet_HistoricSchema.erase }),
    Electronic_Wallet_Historic.Erase(mysqlConnection)
  );

  router.post(
    "/api/Electronic_Wallet_Historic/Create",
    validate({ body: Electronic_Wallet_HistoricSchema.create }),
    Electronic_Wallet_Historic.Create(mysqlConnection)
  );
  router.put(
    "/api/Electronic_Wallet_Historic/Update",
    validate({ body: Electronic_Wallet_HistoricSchema.update }),
    Electronic_Wallet_Historic.Update(mysqlConnection)
  );

  app.use(router);
};
