/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Users = require("../controllers/Users");

module.exports = (app, router, mysqlConnection) => {
  // Ruta para mandar a llamar a la funcion de lectura de datos
  router.get("/api/Users/Read", Users.Read(mysqlConnection));
  router.post("/api/Users/ReadId", Users.ReadId(mysqlConnection));
  router.delete("/api/Users/Delete", Users.Delete(mysqlConnection));
  router.post("/api/Users/Create", Users.Create(mysqlConnection));
  router.put("/api/Users/Update", Users.Update(mysqlConnection));
  /*router.put(
    "/api/Users/Read",
    Users.Update(Id_User, User_Name, Email, rol, status)
  );
*/
  app.use(router);
};
