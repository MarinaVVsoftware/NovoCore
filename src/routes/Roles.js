// ejemplo de instancia de controlador
const Roles = require("../controllers/Roles");

module.exports = (app, router, mysqlConnection) => {
  // Ruta para mandar a llamar a la funcion de lectura de datos
  router.get("/api/Roles/Read", Roles.Read(mysqlConnection));
  router.delete("/api/Roles/Delete", Roles.Delete(mysqlConnection));
  router.post("/api/Roles/Create", Roles.Create(mysqlConnection));
  router.put("/api/Roles/Update", Roles.Update(mysqlConnection));

  app.use(router);
};
