/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Users = require("../controllers/Users");

module.exports = (app, router, mysqlConnection) => {
  // Ruta para mandar a llamar a la funcion de lectura de datos
  router.get("/api/Users/Read", Users.Read(mysqlConnection));
  // router.get("/api/Users/ReadId", Users.ReadId(mysqlConnection, Id_User));
  /* router.post("/api/Users/Read", Users.Create(User_Name, Email, rol, status));
  router.put(
    "/api/Users/Read",
    Users.Update(Id_User, User_Name, Email, rol, status)
  );
*/
  app.use(router);
};
