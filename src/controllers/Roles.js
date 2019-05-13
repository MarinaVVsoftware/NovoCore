const Log = require("../helpers/Logs");

// Controller - Roles
const Roles = {};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Roles.Read = function(mysqlConnection) {
  return function(req, res) {
    try {
      mysqlConnection.query("CALL SP_READ_ROLES", (err, rows, fields) => {
        if (!err) {
          console.log("1");
          res.status(200).send(JSON.stringify(rows));
        } else {
          console.log(err);
          console.log("2");
          res.status(400).send(JSON.stringify(err));
        }
      });
    } catch (error) {
      console.log("3");
      console.log(error);
      res.status(400).send(error);
    }
  };
};

// Funcion para eliminar usuarios por su ID
Roles.Delete = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Rol_Name)
      res.status(400).send({ error: "El objeto Rol Name no se ha deifinido" });
    try {
      const query = " CALL SP_DELETE_ROLES(?);";
      //DELETE FROM Roles WHERE Id_User = ?
      mysqlConnection.query(query, [req.body.Rol_Name], (err, rows, fields) => {
        if (!err) {
          res.json({ status: "ROL DELETED" });
        } else {
          console.log(err);
        }
      });
    } catch (error) {}
  };
};
//Funcion para Insertar Usuarios dentro de la Tabla
Roles.Create = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Rol_Name)
      res.status(400).send({
        error: "No se ha definido el objeto ROL NAME dentro del body."
      });
    // if (!req.body.Jsn)
    //   res.status(400).send({
    //     error: "No se ha definido el objeto JSON dentro del body."
    //   });
    if (!req.body.Id_Grade)
      res.status(400).send({ error: "No se ha definido el objeto Rol." });
    const Jsn = JSON.stringify(req.body.Jsn);
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_ROLES(?,?,?);",
        [req.body.Rol_Name, Jsn, req.body.Id_Grade],
        (err, result) => {
          if (!err) {
            res.json({ status: "ROL SAVED" });
          } else {
            res.status(400).send({ error: err });
          }
        }
      );
    } catch (error) {
      res.status(400).send({ error: error });
    }
  };
};
//Funcion para Modificar Usuarios
Roles.Update = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Rol_Name)
      res.status(400).send({ error: "No se ha definido el Objeto  Rol Name" });
    if (!req.body.Jsn)
      res.status(400).send({ error: "No se ha definido el Objeto Jsn" });
    if (!req.body.Id_Grade)
      res
        .status(400)
        .send({ error: "No se ha definido el Objeto Jerarquias " });
    try {
      const query = `    
      CALL SP_UPDATE_ROLES(?, ?, ?,?,?);
    `;
      mysqlConnection.query(
        query,
        [req.body.Rol_Name, req.body.Jsn, req.body.Id_Grade],
        (err, rows, fields) => {
          if (!err) {
            res.json({ status: "ROL UPDATED" });
          } else {
            console.log(err);
            res.status(400).send(err);
          }
        }
      );
    } catch (error) {
      res.status(400).send({ error });
    }
  };
};

module.exports = Roles;
