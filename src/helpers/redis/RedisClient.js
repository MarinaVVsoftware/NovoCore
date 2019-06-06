var redis = require("redis");
var RedisSchema = require("./RedisSchema");

class RedisClass {
  constructor(config) {
    try {
      var instance = redis.createClient({
        host: config.host,
        port: config.port,
        db: config.db,
        password: config.password,
        retry_strategy: function(options) {
          if (options.error && options.error.code === "ECONNREFUSED") {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error("The server refused the connection");
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error("Retry time exhausted");
          }
          if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
          }
          // reconnect after
          return Math.min(options.attempt * 100, 3000);
        }
      });

      /* Evento que maneja los errores de servidor de Redis. */
      instance.on("error", function(err) {
        console.log(
          "Redis Error Event -> " +
            instance.host +
            ": " +
            instance.port +
            " -> " +
            err
        );
        this.redis = null;
      });

      // declaración de la instancia y las variables
      this.redis = instance;
      this.schema = this.CreateSchema(RedisSchema);
    } catch (error) {
      console.log("El servidor Redis ha fallado." + error);
      this.redis = null;
    }
  }

  CreateSchema(schema) {
    return schema;
  }

  UpdateSchema() {}
}

module.exports = RedisClass;
