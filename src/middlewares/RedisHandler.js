/**
 * Middleware: RedisHandler
 * Middleware para caché de datos. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.
 */
const RedisHandler = {};

RedisHandler.ReadCache = redis => {
  return (req, res, next) => {
    try {
      //si no debe pasar por redis, entonces debe dejar pasar al endpoint con normalidad
      // res.send({ route: req.route, res: res.headersSent });
      // next();

      if (req.route.stack[0].method == "get") {
        console.log("redis de lectura");
        console.log({
          route: req.route.path,
          method: req.route.stack[0].method
        });
        next();
      } else {
        return;
      }
    } catch (error) {
      res.status(500).send({ error: "El servidor redis ha fallado: " + error });
    }
  };
};

RedisHandler.WriteCache = redis => {
  return (req, res, next) => {
    try {
      if (req.route.stack[0].method == "post" || "put" || "patch" || "delete") {
        console.log("redis de escritura");
        console.log({
          route: req.route.path,
          method: req.route.stack[0].method
        });
        res.send();
      } else {
        return;
      }
    } catch (error) {
      res.status(500).send({ error: "El servidor redis ha fallado: " + error });
    }
  };
};

module.exports = RedisHandler;
