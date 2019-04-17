/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Users = require("../controllers/Users");

module.exports = (app, router) => {
  // ejemplo de ruta
  router.get("/api/users/get", Users.example());

  app.use(router);
};
