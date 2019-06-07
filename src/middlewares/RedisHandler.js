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

/* Escritura de caché. Por aquí pasan todos los endpoints de tipo put, post, patch y delete. */
RedisHandler.ReadCache = (redis, key) => {
  return (req, res, next) => {
    try {
      const method = req.route.stack[0].method;
      /* Obtiene las reglas de ese endpoint */
      const rule = redis.schema[key].read[req.route.path];
      /* Obtiene el param que funciona como key para ese endpoint */
      const hash = req.params[rule.hash];
      /* Obtiene el Header para evitar el ciclo infinito de caché */
      const header = req.get("cache-request");
      console.log("header: " + header);

      /* valida que se haya obtenido correctamente el hash del esquema */
      if (hash === undefined)
        res.status(500).send({
          error:
            "The redis server has failed. The hash obtained from the schema threw undefined."
        });
      else {
        /* Evita por accidente leer caché de un método que no es get */
        if (method == "get" && header === undefined) {
          /* Si existe la key y hash asociada, trae el valor */
          IfHashExists(redis, key, hash)
            .then(result => {
              if (result == 1) {
                /* Trae la caché */
                GetHash(redis, key, hash)
                  .then(result => {
                    /* Envía los datos en caché */
                    console.log(
                      "endpoint obtenido de caché: " + req.route.path
                    );
                    res.status(200).send(result);
                  })
                  .catch(error => {
                    console.log("Redis Failed: " + error);
                    next();
                  });
              } else {
                next();
              }
            })
            .catch(error => {
              console.log("Redis Failed: " + error);
              next();
            });
        } else {
          return;
        }
      }
    } catch (error) {
      res.status(500).send({ error: "El servidor redis ha fallado: " + error });
    }
  };
};

/* Lectura de caché. Por aquó pasan todos los endpoints de tipo get */
RedisHandler.WriteCache = (redis, key) => {
  return (req, res) => {
    try {
      const method = req.route.stack[0].method;
      /* Obtiene las reglas de ese endpoint */
      const rule = redis.schema[key].write[req.route.path][method];
      /* Obtiene el param que funciona como key para ese endpoint */
      const hash = req.params[rule.hash];
      const url = rule.url(hash);

      /* valida que se haya obtenido correctamente el hash del esquema */
      if (hash === undefined) {
        console.log(
          "The redis server has failed. The hash obtained from the schema threw undefined."
        );
        res.send();
      } else {
        if (method == "post" || "put" || "patch" || "delete") {
          /* Para delete borra la caché, el resto de los casos crea caché */
          if (method != "delete") {
            // para evitar ciclar infinitamente la caché, se manda un
            // header que excluye la lectura por caché cuando se hace escritura.
            var headers = new Headers();
            headers.set("cache-request", "true");
            console.log(headers);
            /* Ejecuta el endpoint de lectura para obtener los datos y cachearlos */
            GetWroteData(redis.host + url, {
              method: "GET",
              headers: { "cache-request": "true" }
            })
              .then(response => {
                return response.json();
              })
              .then(json => {
                SetHash(redis, key, hash, JSON.stringify(json))
                  .then(() => {
                    console.log("endpoint cacheado: " + url);
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
          } else {
            DeleteHash(redis, key, hash)
              .then(() => {
                res.send();
              })
              .catch(error => {
                console.log("Redis Failed: " + error);
                res.send();
              });
          }
        } else {
          res.send();
        }
      }
    } catch (error) {
      console.log("Redis Failed: " + error);
      res.send();
    }
  };
};

async function GetWroteData(url) {
  return await fetch(url);
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
