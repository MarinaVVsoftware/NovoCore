// Controller - Users
const Users = {};

//funcion para llamar y leer la informaion dentro de los usuarios en general
Users.Read = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query("CALL SP_READ_USERS;", (err, rows, fields) => {
        if (err) next(newError(err, 400));
        rows.pop();
        res.status(200).send(JSON.stringify(rows));
      });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

//Funcion para llamar La informacion de 1 usuario a travez de su Id
Users.ReadId = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_READ_USERS_BY_EMAIL(?);",
        [req.body.email],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send(JSON.stringify(rows[0]));
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Funcion para eliminar usuarios por su ID
Users.Delete = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_DELETE_USERS(?);",
        [req.body.email],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "USER DELETED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

//Funcion para Insertar Usuarios dentro de la Tabla
Users.Create = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_CREATE_USER(?,?,?,?);",
        [req.body.userName, req.body.email, req.body.rol, req.body.status],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "USER CREATED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

//Funcion para Modificar Usuarios
Users.Update = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_UPDATE_USERS(?, ?, ?,?,?);",
        [
          req.body.Id_User,
          req.body.User_Name,
          req.body.Email,
          req.body.rol,
          req.body.Status
        ],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "USER UPDATED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.Permission = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_READ_PERMISSIONS(?);",
        [req.body.Email],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send(JSON.stringify(rows[0]));
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Users;
