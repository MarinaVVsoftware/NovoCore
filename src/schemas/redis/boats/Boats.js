/* Mapa de lectura/escritura de RedisHandler. */

/* Cada objeto de tipo "write" debe tener su propia url, dado que "puede"
que endpoints parecidos le peguen a diferentes métodos get. */
module.exports = {
  read: {
    "/api/clients/:id/boats/": {
      hash: "id",
      key: "boats",
      url: function(id) {
        return "/api/clients/" + id + "/boats/";
      }
    }
  },
  write: {
    "/api/clients/:id/boats/": {
      key: "boats",
      get: {
        hash: "id",
        url: function(id) {
          return "/api/clients/" + id + "/boats/";
        }
      }
    },
    "/api/clients/:id/boats/:name": {
      key: "boats",
      put: {
        hash: "id",
        url: function(id) {
          return "/api/clients/" + id + "/boats/";
        }
      },
      patch: {
        hash: "id",
        url: function(id) {
          return "/api/clients/" + id + "/boats/";
        }
      },
      delete: {
        hash: "id",
        url: function(id) {
          return "/api/clients/" + id + "/boats/";
        }
      }
    }
  }
};
