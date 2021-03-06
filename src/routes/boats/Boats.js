/** Routes de todas las rutas para el manejo de boats. */
const path = require("path");
const Boats = require(path.resolve(__dirname, "../../controllers/boats/Boats"));
const Schema = require(path.resolve(
  __dirname,
  "../../schemas/validations/boats/Boats"
));
const RedisSchema = require(path.resolve(
  __dirname,
  "../../schemas/redis/boats/Boats"
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

  /* Rutas de Boats */
  router.get(
    "/api/clients/:id/boats/",
    validate({ params: Schema.ParamsGetBoatsByClient }),
    redisHandler.ReadCache(redis, RedisSchema),
    Boats.GetBoatsByClient(...instances),
    redisHandler.WriteCache(redis, RedisSchema)
  );
  router.put(
    "/api/clients/:id/boats/:name",
    validate({ params: Schema.ParamsPutBoat, body: Schema.BodyPutBoat }),
    Boats.PutBoat(...instances),
    redisHandler.WriteCache(redis, RedisSchema)
  );
  router.patch(
    "/api/clients/:id/boats/:name",
    validate({ params: Schema.ParamsPatchBoat, body: Schema.BodyPatchBoat }),
    Boats.PatchBoat(...instances),
    redisHandler.WriteCache(redis, RedisSchema)
  );
  router.delete(
    "/api/clients/:id/boats/:name",
    Boats.DeleteBoat(...instances),
    redisHandler.WriteCache(redis, RedisSchema)
  );

  app.use(router);
};
