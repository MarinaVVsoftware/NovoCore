const Log = require("../helpers/Logs");

// Controller - Users
const Users = {};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Users.Read = function(mysqlConnection) {
  return function(req, res) {
    try {
      mysqlConnection.query("CALL SP_READ_USERS", (err, rows, fields) => {
        if (!err) {
          res.status(200).send(JSON.stringify(rows));
        } else {
          console.log(err);
          res.status(400).send(JSON.stringify(err));
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
};

//Funcion para llamar La informacion de 1 usuario a travez de su Id
Users.ReadId = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Email)
      res.status(400).send({
        error:
          "No se ha definido el Objeto Email para poder realizar la busqueda"
      });
    try {
      mysqlConnection.query(
        `CALL SP_READ_USERS_BY_EMAIL(?);`,
        [req.body.Email],

        (err, rows, fields) => {
          if (!err) {
            console.log(rows[0]);
            res.status(200).send(JSON.stringify(rows[0]));
            // res.json(rows[0]);
          } else {
            console.log(err);
            res.status(400).send(err);
          }
        }
      );
    } catch (error) {
      res.status(400).send(error);
    }
  };
};
// Funcion para eliminar usuarios por su ID
Users.Delete = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Email)
      res.status(400).send({ error: "El objeto Email no se ha deifinido" });
    try {
      const query = " CALL SP_DELETE_USERS(?);";
      //DELETE FROM Users WHERE Id_User = ?
      mysqlConnection.query(query, [req.body.Email], (err, rows, fields) => {
        if (!err) {
          res.json({ status: "USER DELETED" });
        } else {
          console.log(err);
        }
      });
    } catch (error) {}
  };
};
//Funcion para Insertar Usuarios dentro de la Tabla
Users.Create = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.userName)
      res.status(400).send({
        error: "No se ha definido el objeto userName dentro del body."
      });
    if (!req.body.email)
      res.status(400).send({
        error: "No se ha definido el objeto email dentro del body."
      });
    if (!req.body.rol)
      res.status(400).send({ error: "No se ha definido el objeto Rol." });
    if (!req.body.status)
      res.status(400).send({ error: "No se ha definido el objeto Status." });

    try {
      mysqlConnection.query(
        "CALL SP_CREATE_USER(?,?,?,?);",
        [req.body.userName, req.body.email, req.body.rol, req.body.status],
        (err, result) => {
          if (!err) {
            res.json({ status: "USER SAVED" });
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
Users.Update = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Id_User)
      res.status(400).send({
        error: "No se ha definido el Objeto Identificador del Usuario"
      });
    if (!req.body.User_Name)
      res
        .status(400)
        .send({ error: "No se ha definido el Objeto Nombre del Usuraio" });
    if (!req.body.Email)
      res.status(400).send({ error: "No se ha definido el Objeto  Email" });
    if (!req.body.rol)
      res.status(400).send({ error: "No se ha definido el Objeto Rol" });
    if (!req.body.Status)
      res.status(400).send({ error: "No se ha definido el Objeto Status " });
    try {
      const query = `    
      CALL SP_UPDATE_USERS(?, ?, ?,?,?);
    `;
      mysqlConnection.query(
        query,
        [
          req.body.Id_User,
          req.body.User_Name,
          req.body.Email,
          req.body.rol,
          req.body.Status
        ],
        (err, rows, fields) => {
          if (!err) {
            res.json({ status: "USER UPDATED" });
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
Users.Permission = function(mysqlConnection) {
  return function(req, res) {
    if (!req.body.Email)
      res.status(400).send({
        error:
          "No se ha definido el Objeto Email para poder realizar la busqueda"
      });
    try {
      var rol = 0;
      mysqlConnection.query(
        `CALL SP_READ_PERMISSIONS(?);`,
        [req.body.Email],

        (err, rows, fields) => {
          if (!err) {
            console.log(rows[0]);
            res.status(200).send(JSON.stringify(rows[0]));
            // res.json(rows[0]);
          } else {
            console.log(err);
            res.status(400).send(err);
          }
        }
      );
    } catch (error) {
      res.status(400).send(error);
    }
  };
};
module.exports = Users;
