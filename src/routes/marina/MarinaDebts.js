// Routes
const path = require("path");
const MarinaDebts = require(path.resolve(
  __dirname,
  "../../controllers/marina/MarinaDebts"
));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/marina/MarinaDebts"
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
    "/api/marina/quotations/debt/read",
    MarinaDebts.Read(...instances)
  );
  router.delete(
    "/api/marina/quotations/debt/erase",
    validate({ body: Schema.erase }),
    MarinaDebts.Erase(...instances)
  );
  router.post(
    "/api/marina/quotations/debt/create",
    validate({ body: Schema.create }),
    MarinaDebts.Create(...instances)
  );
  router.put(
    "/api/marina/quotations/debt/update",
    validate({ body: Schema.update }),
    MarinaDebts.Update(...instances)
  );

  app.use(router);
};
