/**
 * Middleware: RedisHandler
 * Middleware para caché de datos. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.
 */
module.exports = (app, redis) => {
  app.use((req, res, next) => {
    try {
      console.log(redis.schema);
      //si no debe pasar por redis, entonces debe dejar pasar al endpoint con normalidad
      next();
    } catch (error) {
      res.status(500).send({ error: "El servidor redis ha fallado: " + error });
    }
  });
};
