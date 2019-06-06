/**
 * Middleware: RedisHandler
 * Middleware para caché de datos. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.
 *
 * Para hacer el uso correcto del middleware de Redis, hay que entender 3 objetos importantes
 * que entran en juego:
 *
 * 1) El "Schema" que mapea las relaciones de escritura/lectura
 * 2) El cacheo de la escritura
 * 3) El cacheo de la lectura
 *
 * El proceso es el siguiente: Cada vez que un "endpoint" de tipo escritura (post, put, patch, delete)
 * se ejecute (que esté mapeado en el Schema) provocará que Redis haga caché de todos los datos de lectura.
 * Cuando se ejecute el endpoint de lectura, en vez de ejecutar el endpoint de tipo "get" correspondiente
 * (lo cual implica tiempo en "ms" para leer la db y demás), en vez de eso irá directo a leer a redis los datos
 * cacheados.
 *
 * Por ende, cada vez que un endpoint de escritura dentro del Schema se ejecute, provoca el cacheo,
 * y cada endpoint de lectura asociado provoca que se obtenga la data de la caché y no pasando por el endpoint.
 * Para que este sistema funcione, es necesario hacer pequeñas modificaciones a las rutas y endpoints afectados,
 * y añadirlos al mapa del schema. Lista de modificaciones necesarias:
 *
 * 1) En la ruta del endpoint de escritura hay que colocar, dentro del método, de la siguiente manera:
 *
 * router.<method>(
 *     <url>,
 *     <validate({...})>,
 *     <controller.method(...instances)>,
 *     redisHandler.WriteCache(redis)      <- esta línea ejecuta el middleware de redis de escritura
 *  );
 *
 * 2) Dentro del método del controlador respectivo, hay que modificar los métodos de response. Todas aquellas
 * líneas de tipo "res.status.send" del método de escritura deben ser reemplazados por lo siguiente:
 *
 * res.status(<code>);
 * res.json(<json object>);
 * next();                    <- esta línea es fundamental. Permite el acceso al middleware de redis.
 *
 * 3) En la ruta del endpoint de lectura hay que colocar también un cambio similar, pero en vez de hacerlo
 * después del controlador, se hace antes, ver el ejemplo:
 *
 * router.get(
 *     <url>,
 *     <validate({...})>,
 *     redisHandler.ReadCache(redis)      <- esta línea ejecuta el middleware de redis de lectura
 *     <controller.method(...instances)>,
 *  );
 *
 * 4) Crea la relación entre este endpoint de escritura con su endpoint de lectura dentro del Schema de Redis.
 * Sin esta relación no funcionarán los cambios que has realizado.
 *
 *
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
