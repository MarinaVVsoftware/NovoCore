const Log = require("../helpers/Logs");

// Controller - Users
const Users = {};
//funcion para llamar y leer la informaion dentro de los usuarios en general
Users.Read = function(mysqlConnection) {
  return function(req, res) {
    try {
      console.log("Estoy dentro de la funcion try ");
      console.log(mysqlConnection);
      mysqlConnection.query("CALL SP_READ_USERS", (err, rows, fields) => {
        if (!err) {
          res.status(200).send(JSON.stringify(rows));
        } else {
          res.status(400).send(JSON.stringify(err));
        }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };
};

//Funcion para llamar La informacion de 1 usuario a travez de su Id
Users.ReadId = function(Id_User) {
  const { Id_User } = req.params;
  mysqlConnection.query(
    "SELECT * FROM Users WHERE Id_User = ?",
    [Id_User],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
};
// Funcion para eliminar usuarios por su ID
Users.Delete = function() {
  const { Id_User } = req.params;
  const query = `SET @Id_User = ?;
    CALL SP_DELETE_USERS(@Id_User);
    `;
  //DELETE FROM Users WHERE Id_User = ?
  mysqlConnection.query(query, [Id_User], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "USER DELETED" });
    } else {
      console.log(err);
    }
  });
};
//Funcion para Insertar Usuarios dentro de la Tabla
Users.Create = function(User_Name, Email, rol, Status) {
  const { User_Name, Email, rol, Status } = req.body;
  console.log(User_Name, Email, rol, Status);
  const query = `
      SET @User_Name = ?;
      SET @Email = ?;
      SET @rol = ?;
      SET @Status = ?;
      CALL SP_CREATE_USER(@User_Name, @Email, @rol,@Status);
    `;
  mysqlConnection.query(
    query,
    [User_Name, Email, rol, Status],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "USER SAVED" });
      } else {
        console.log(err);
      }
    }
  );
};
//Funcion para Modificar Usuarios
Users.Update = function(Id_User, User_Name, Email, rol, Status) {
  const { User_Name, Email, rol, Status } = req.body;
  const { Id_User } = req.params;
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
    [Id_User, User_Name, Email, rol, Status],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "USER UPDATED" });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = Users;
