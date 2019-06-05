/**
 * Middleware: RedisHandler
 * Middleware para caché de datos. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.
 */
module.exports = redis => {
  return (req, res, next) => {
    try {
      console.log({ route: req.route.path, res: res.headersSent });
      //si no debe pasar por redis, entonces debe dejar pasar al endpoint con normalidad
      // res.send({ route: req.route, res: res.headersSent });
      next();
    } catch (error) {
      res.status(500).send({ error: "El servidor redis ha fallado: " + error });
    }
  };
};
