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
 *   router.<method>(
 *     <url>,
 *     <validate({...})>,
 *     <controller.method(...instances)>,
 *     redisHandler.WriteCache(redis, <model>)      <- esta línea ejecuta el middleware de redis de escritura
 *   );
 *
 * 2) Dentro del método del controlador respectivo, hay que modificar los métodos de response. Todas aquellas
 * líneas de tipo "res.status.send" del método de escritura deben ser reemplazados por lo siguiente:
 *
 *   res.status(<code>);
 *   res.json(<json object>);
 *   next();                    <- esta línea es fundamental. Permite el acceso al middleware de redis.
 *
 * 3) En la ruta del endpoint de lectura hay que colocar también un cambio similar, pero en vez de hacerlo
 * después del controlador, se hace antes, ver el ejemplo:
 *
 *   router.get(
 *     <url>,
 *     <validate({...})>,
 *     redisHandler.ReadCache(redis)      <- esta línea ejecuta el middleware de redis de lectura
 *     <controller.method(...instances)>,
 *     redisHandler.WriteCache(redis, <model>) <- esta línea cachea los métodos get después de leer
 *    );
 *
 * 4) Para hacer el caché correctamente de una ruta de lectura (get) hay que hacer dos modificaciones en la respuesta
 * del endpoint de get. Dentro del controlador respectivo:
 *
 *   A) la primera línea del endpoint debe comenzar con la siguiente validación
 *   if (!req.get("Cache-Request")) res.setHeader("Cache-By-Read", "true");
 *
 *   B) se debe insertar un cambio en aquellas lineas de tipo "res.status.send":
 *   res.status(<code>);
 *   res.json(<json object>);
 *   res.body = { boats: response }; <-- esta línea es fundamental. se requiere para hacer el caché del response.
 *   next();                    <- esta línea es fundamental. Permite el acceso al middleware de redis.
 *
 * 5) Crea la relación entre este endpoint de escritura con su endpoint de lectura dentro del Schema de Redis.
 * Sin esta relación no funcionarán los cambios que has realizado. para ver la estructura y explicación del Schema
 * de redis, ir a:  src\helpers\redis\RedisSchema.js
 *
 * no olvides en tu route file verificar que traigas de route master el objecto "redis" y "redisHandler".
 */
const RedisHandler = {};

/* Escritura de caché. Por aquí pasan todos los endpoints de tipo put, post, patch y delete. */
RedisHandler.ReadCache = (redis, key) => {
  return (req, res, next) => {
    if (redis.redis.connected)
      try {
        /* Obtiene el metodo REST */
        const method = req.route.stack[0].method;
        /* Obtiene las reglas de ese endpoint */
        const rule = redis.schema[key].read[req.route.path];
        /* Obtiene el param que funciona como key para ese endpoint */
        const hash = req.params[rule.hash];
        const url = rule.url(hash);
        /* Obtiene el Header para evitar el ciclo infinito de caché */
        const header = req.get("Cache-Request");

        /* valida que se haya obtenido correctamente el hash del esquema,
      si falla, pasa por el endpoint con normalidad */
        if (hash === undefined) {
          console.log(
            "The Redis schema has failed. The hash obtained from the schema threw undefined. Going through endpoint controller."
          );
          next();
        } else {
          /* Evita por accidente leer caché de un método que no es get, y
        si no trae el header "Cache-Request" necesario, no hace el caché */
          if (method == "get" && header === undefined) {
            /* Si existe la key y hash asociada */
            IfHashExists(redis, key, hash)
              .then(result => {
                if (result == 1) {
                  /* Trae la caché */
                  GetHash(redis, key, hash)
                    .then(result => {
                      /* Output de Debug */
                      if (redis.debug) {
                        console.log(
                          "endpoint obtenido de caché: " + method + " - " + url
                        );
                      }
                      /* Envía los datos en caché via response */
                      res.status(200).send(result);
                    })
                    .catch(error => {
                      console.log(
                        "The Redis server has failed obtaining data: " + error
                      );
                      next();
                    });
                } else next();
              })
              .catch(error => {
                console.log(
                  "The Redis server has failed obtaining hash: " + error
                );
                next();
              });
          } else next();
        }
      } catch (error) {
        console.log("Redis Failed - trycatch section: " + error);
        next();
      }
    else {
      next();
      return;
    }
  };
};

/* Lectura de caché. Por aquó pasan todos los endpoints de tipo get */
RedisHandler.WriteCache = (redis, key) => {
  return (req, res) => {
    if (redis.redis.connected)
      try {
        /* Obtiene el metodo REST */
        const method = req.route.stack[0].method;
        /* Obtiene las reglas de ese endpoint */
        const rule = redis.schema[key].write[req.route.path][method];
        /* Obtiene el param que funciona como key para ese endpoint */
        const hash = req.params[rule.hash];
        const url = rule.url(hash);

        /* valida que se haya obtenido correctamente el hash del esquema,
      si falla, termina el response con normalidad */
        if (hash === undefined) {
          console.log(
            "The Redis schema has failed. The hash obtained from the schema threw undefined."
          );
          res.send();
        } else
          switch (method) {
            case "post" || "put" || "patch":
              // para evitar ciclar infinitamente la caché, se manda un
              // header que excluye la lectura por caché cuando se hace escritura.
              var headers = new Headers();
              headers.append("Cache-Request", "true");
              const options = {
                method: "GET",
                headers: headers
              };

              /* Ejecuta el endpoint de lectura para obtener los datos y cachearlos */
              GetData(redis.host + url, options)
                .then(response => {
                  return response.json();
                })
                .then(json => {
                  /* Crea el caché */
                  SetHash(redis, key, hash, JSON.stringify(json))
                    .then(() => {
                      /* Output de Debug */
                      if (redis.debug) {
                        console.log(
                          "endpoint cacheado: " + method + " - " + url
                        );
                      }
                      res.send();
                    })
                    .catch(error => {
                      console.log("Redis Failed: " + error);
                      res.send();
                    });
                })
                .catch(error => {
                  console.log("Redis Failed: " + error);
                  res.send();
                });
              break;
            case "delete":
              DeleteHash(redis, key, hash)
                .then(() => {
                  res.send();
                })
                .catch(error => {
                  console.log("Redis Failed: " + error);
                  res.send();
                });
              break;
            case "get":
              /* Cada enpoint "get" que escribe en caché lo hace a partir de un header especial
            que debe ser seteado dentro del controlador. Solo debe setearse si no trae del request
            el header "Cache-Request" */
              if (req.get("Cache-By-Read")) {
                /* Ejecuta el endpoint de lectura para obtener los datos y cachearlos */
                SetHash(redis, key, hash, JSON.stringify(res.body))
                  .then(() => {
                    /* Output de Debug */
                    if (redis.debug) {
                      console.log("endpoint cacheado: " + method + " - " + url);
                    }
                    res.send();
                  })
                  .catch(error => {
                    console.log("Redis Failed: " + error);
                    res.send();
                  });
                res.send();
              } else {
                /* Output de Debug */
                if (redis.debug) {
                  console.log(
                    "missing header Cache-By-Read by endpoint: " +
                      method +
                      " - " +
                      url
                  );
                }
                res.send();
              }
              break;
            default:
              res.send();
              break;
          }
      } catch (error) {
        console.log("Redis Failed - trycatch section: " + error);
        res.send();
      }
    else {
      res.send();
    }
  };
};

async function GetData(url, options) {
  return await fetch(url, options);
}

async function SetHash(redis, key, hash, value) {
  return await redis.redis.hset(key, hash, value);
}

async function GetHash(redis, key, hash) {
  return await redis.redis.hget(key, hash);
}

async function IfHashExists(redis, key, hash) {
  return await redis.redis.hexists(key, hash);
}

async function DeleteHash(redis, key, hash) {
  return await redis.redis.hdel(key, hash);
}

module.exports = RedisHandler;
