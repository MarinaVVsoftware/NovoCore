const Log = require("../helpers/Logs");

// Controller - Users
const Users = {};
const parametros = {
  Id_User: "",
  User_Name: "",
  Email: "",
  rol: "",
  Status: ""
};

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
    try {
      parametros.Id_User = req.body.Id_User;
      mysqlConnection.query(
        "SELECT * FROM Users WHERE Id_User = ?",
        [Id_User],
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
    try {
      parametros.Id_User = req.params;
      const query = `SET @Id_User = ?;
        CALL SP_DELETE_USERS(@Id_User);
        `;
      //DELETE FROM Users WHERE Id_User = ?
      mysqlConnection.query(
        query,
        [parametros.Id_User],
        (err, rows, fields) => {
          if (!err) {
            res.json({ status: "USER DELETED" });
          } else {
            console.log(err);
          }
        }
      );
    } catch (error) {}
  };
};
//Funcion para Insertar Usuarios dentro de la Tabla
Users.Create = function(mysqlConnection) {
  return function(res, req) {
    try {
      parametros = req.body;
      console.log(parametros);
      const query = `
          SET @User_Name = ?;
          SET @Email = ?;
          SET @rol = ?;
          SET @Status = ?;
          CALL SP_CREATE_USER(@User_Name, @Email, @rol,@Status);
        `;
      mysqlConnection.query(
        query,
        [
          parametros.User_Name,
          parametros.Email,
          parametros.rol,
          parametros.Status
        ],
        (err, rows, fields) => {
          if (!err) {
            res.json({ status: "USER SAVED" });
          } else {
            console.log(err);
          }
        }
      );
    } catch (error) {}
  };
};
//Funcion para Modificar Usuarios
Users.Update = function(mysqlConnection) {
  return function(res, req) {
    try {
      parametros = req.body;
      parametros.Id_User = req.params;
      const query = `
      SET @Id_User = ? ;
      SET @User_Name = ?;
      SET @Email = ?;
      SET @rol = ?;
      SET @Status = ?;    
      CALL Update_Usuario(@Id_User, @User_Name, @Email,@rol,Status);
    `;
      mysqlConnection.query(
        query,
        [
          parametros.Id_User,
          parametros.User_Name,
          parametros.Email,
          parametros.rol,
          parametros.Status
        ],
        (err, rows, fields) => {
          if (!err) {
            res.json({ status: "USER UPDATED" });
          } else {
            console.log(err);
          }
        }
      );
    } catch (error) {}
  };
};

module.exports = Users;
