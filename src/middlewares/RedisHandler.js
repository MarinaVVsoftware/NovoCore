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
 * 4) Para hacer el caché correctamente de una ruta de lectura (get) hay que hacer modificaciones en la respuesta
 * del endpoint de get. Dentro del controlador respectivo:
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
 * 6) No olvidar que los endpoints de lectura (GET) necesitan ser enviados con el header "Cache-By-Read" para que
 * funciones, y lo endpoints de escritura (PUT, POST, PATCH, DELETE) necesitan el header "Cache-Request" para
 * que se escriba en cache. Sin estos headers los endpoints pasarán sin tocar cache, con normalidad.
 *
 * no olvides en tu route file verificar que traigas de route master el objecto "redis" y "redisHandler".
 */
const RedisHandler = {};

/* Escritura de caché. Por aquí pasan todos los endpoints de tipo put, post, patch y delete. */
RedisHandler.ReadCache = (redis, schema) => {
  return (req, res, next) => {
    if (redis.redis.connected)
      if (schema)
        try {
          /* Obtiene el metodo REST */
          const method = req.route.stack[0].method;
          /* Obtiene las reglas de ese endpoint */
          const rule = schema.read[req.route.path];
          const key = schema.read[req.route.path].key;

          let hash = null;
          let url = null;
          /* Obtiene el param que funciona como key para ese endpoint. Si el endpoint
          de lectura es global (y no basado en un param) simplemente obtiene la url */
          if (schema.read[req.route.path].hash) {
            hash = req.params[rule.hash];
            url = rule.url(hash);
          } else url = rule.url();

          /* Obtiene el Header "Cache-By-Read" para evitar el ciclo infinito de caché */
          const header = req.get("Cache-By-Read");

          /* valida que se haya obtenido correctamente el hash del esquema,
        si falla, pasa por el endpoint con normalidad */
          if (hash === undefined) {
            console.log(
              "The Redis schema has failed. The hash obtained from the schema threw undefined. Going through endpoint controller."
            );
            next();
          } else {
            /* Evita por accidente leer caché de un método que no es get, y
          si trae el header "Cache-By-Read" hace lectura de cache */
            if (method == "get" && header)
              if (hash)
                ReadCacheWithHashes(res, next, redis, key, hash, method, url);
              else ReadCacheWithKeys(res, next, redis, key, method, url);
            else next();
          }
        } catch (error) {
          console.log("Redis Failed in Read - trycatch section: " + error);
          next();
        }
      else {
        console.log(
          "Redis Failed by read. Dev error: Schema was not provided by that method."
        );
        next();
      }
    else {
      console.log("Redis Connection Failed by Read Cache.");
      next();
    }
  };
};

/* Lectura de caché. Por aquó pasan todos los endpoints de tipo get */
RedisHandler.WriteCache = (redis, schema) => {
  return (req, res, next) => {
    if (redis.redis.connected)
      if (schema)
        try {
          /* Obtiene el metodo REST */
          const method = req.route.stack[0].method;
          /* Obtiene las reglas de ese endpoint */
          const rule = schema.write[req.route.path][method];
          const key = schema.write[req.route.path].key;

          let hash = null;
          let url = null;
          /* Obtiene el param que funciona como key para ese endpoint. Si el endpoint
          de lectura es global (y no basado en un param) simplemente obtiene la url */
          if (rule.hash) {
            hash = req.params[rule.hash];
            url = rule.url(hash);
          } else url = rule.url();

          /* valida que se haya obtenido correctamente el hash del esquema,
          si falla, termina el response con normalidad */
          if (hash === undefined) {
            console.log(
              "The Redis schema has failed. The hash obtained from the schema threw undefined."
            );
            res.send();
          } else
            switch (method) {
              /* Fall Through */
              case "post":
              case "put":
              case "patch":
              case "delete":
                if (req.get("Cache-Request"))
                  WriteCacheByRestWithResponse(
                    req,
                    res,
                    redis,
                    key,
                    hash,
                    method,
                    url
                  );
                else res.send();
                break;
              case "get":
                if (req.get("Cache-By-Read"))
                  WriteCacheWithRestGet(
                    res,
                    redis,
                    key,
                    hash,
                    res.body,
                    method,
                    url
                  );
                else res.send();
                break;
              default:
                res.send();
                break;
            }
        } catch (error) {
          console.log("Redis Failed in write - trycatch section: " + error);
          res.send();
        }
      else {
        console.log(
          "Redis Failed by write. Dev error: Schema was not provided by that method."
        );
        res.send();
      }
    else res.send();
  };
};

/* Maneja el cache a partir de hashes */
function ReadCacheWithHashes(res, next, redis, key, hash, method, url) {
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
                "Endpoint get cache hash successfully. endpoint: " +
                  method +
                  " - " +
                  url
              );
            }
            /* Envía los datos en caché via response */
            res.status(200).send(result);
          })
          .catch(error => {
            console.log(
              "The Redis server has failed obtaining data hash in Read: " +
                error
            );
            next();
          });
      } else {
        next();
      }
    })
    .catch(error => {
      console.log(
        "The Redis server has failed obtaining hash in Read: " + error
      );
      next();
    });
}

/* Maneja el cache a partir de keys */
function ReadCacheWithKeys(res, next, redis, key, method, url) {
  /* Si existe la key asociada */
  IfKeyExists(redis, key)
    .then(result => {
      if (result == 1) {
        /* Trae la caché */
        GetKey(redis, key)
          .then(result => {
            /* Output de Debug */
            if (redis.debug) {
              console.log(
                "Endpoint get cache key successfully. endpoint: " +
                  method +
                  " - " +
                  url
              );
            }
            /* Envía los datos en caché via response */
            res.status(200).send(result);
          })
          .catch(error => {
            console.log(
              "The Redis server has failed obtaining data key in Read: " + error
            );
            next();
          });
      } else {
        next();
      }
    })
    .catch(error => {
      console.log(
        "The Redis server has failed obtaining key in Read: " + error
      );
      next();
    });
}

/* Refactorización de código: Fragmento de código que se encarga de la escritura
en redis por métodos POST, PUT, PATCH y DELETE */
function WriteCacheByRestWithResponse(req, res, redis, key, hash, method, url) {
  console.log(method);
  // para evitar ciclar infinitamente la caché, se manda un
  // header que excluye la lectura por caché cuando se hace escritura.
  var headers = new Headers();
  // headers.append("Cache-Request", "true");
  headers.append("Authorization", req.headers["authorization"]);
  const options = {
    method: "GET",
    headers: headers
  };

  /* Ejecuta el endpoint de lectura para obtener los datos y cachearlos */
  GetData(redis.host + url, options)
    .then(response => response.json())
    .then(data => {
      /* En caso de que el fethc falle */
      if (!data.error)
        if (hash)
          WriteCacheWithHashes(res, redis, key, hash, data, method, url);
        else WriteCacheWithKeys(res, redis, key, data, method, url);
      else {
        console.log("Redis fetch get error in write: " + data.error);
        res.send();
      }
    })
    .catch(error => {
      console.log("Redis fetch get failed in write: " + error);
      res.send();
    });
}

/* Refactorización de código: Fragmento de código que se encarga de la escritura
en redis por métodos GET */
function WriteCacheWithRestGet(res, redis, key, hash, data, method, url) {
  if (hash) WriteCacheWithHashes(res, redis, key, hash, data, method, url);
  else WriteCacheWithKeys(res, redis, key, data, method, url);
}

/* Refactorización de código: Crea un Hash */
function WriteCacheWithHashes(res, redis, key, hash, data, method, url) {
  SetHash(redis, key, hash, JSON.stringify(data))
    .then(() => {
      /* Output de Debug */
      if (redis.debug)
        console.log(
          "Endpoint post cache hash successfully. endpoint: " +
            method +
            " - " +
            url
        );
      res.send();
    })
    .catch(error => {
      console.log(
        "Redis failed by setting hash on write cache by read: " + error
      );
      res.send();
    });
  res.send();
}

/* Refactorización de código: Crea una Key */
function WriteCacheWithKeys(res, redis, key, data, method, url) {
  SetKey(redis, key, JSON.stringify(data))
    .then(() => {
      /* Output de Debug */
      if (redis.debug)
        console.log(
          "Endpoint post cache key successfully. endpoint: " +
            method +
            " - " +
            url
        );
      res.send();
    })
    .catch(error => {
      console.log(
        "Redis failed by setting key on write cache by read: " + error
      );
      res.send();
    });
  res.send();
}

/* Snippet para hacer fetch a una url de la API */
async function GetData(url, options) {
  return await fetch(url, options);
}

/* Snippet para setear un hash */
async function SetHash(redis, key, hash, value) {
  return await redis.redis.hset(key, hash, value);
}

/* Snippet para obtener un hash */
async function GetHash(redis, key, hash) {
  return await redis.redis.hget(key, hash);
}

/* Snippet para verificar la existencia de un hash */
async function IfHashExists(redis, key, hash) {
  return await redis.redis.hexists(key, hash);
}

/* Snippet para setear una key */
async function SetKey(redis, key, value) {
  return await redis.redis.set(key, value);
}

/* Snippet para setear una key */
async function GetKey(redis, key) {
  return await redis.redis.get(key);
}

/* Snippet para verificar la existencia de una key */
async function IfKeyExists(redis, key) {
  return await redis.redis.exists(key);
}

module.exports = RedisHandler;
