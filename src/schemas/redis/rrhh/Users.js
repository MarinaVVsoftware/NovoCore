/* Mapa de lectura/escritura de RedisHandler. */

/* Cada objeto de tipo "write" debe tener su propia url, dado que "puede"
que endpoints parecidos le peguen a diferentes métodos get. */
module.exports = {
  read: {
    "/api/users/": {
      key: "users",
      url: function() {
        return "/api/users/";
      }
    }
  },
  write: {
    "/api/users/": {
      key: "users",
      get: {
        url: function() {
          return "/api/users/";
        }
      }
    },
    "/api/users/:name": {
      key: "users",
      get: {
        url: function() {
          return "/api/users/";
        }
      },
      put: {
        url: function() {
          return "/api/users/";
        }
      }
    },
    "/api/users/:email": {
      key: "users",
      delete: {
        url: function() {
          return "/api/users/";
        }
      }
    }
  }
};
