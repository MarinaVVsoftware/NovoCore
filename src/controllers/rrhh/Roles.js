// Rols - Controller
const Roles = {};

// Funcion para llamar y leer la informaion dentro de los usuarios en general
Roles.Read = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query("CALL SP_READ_ROLES", (err, rows, fields) => {
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

// Funcion para eliminar usuarios por su ID
Roles.Erase = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      mysqlConnection.query(
        "CALL SP_DELETE_ROLES(?)",
        [req.body.rolName],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "ROL DELETED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Funcion para Insertar Usuarios dentro de la Tabla
Roles.Create = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      const jsn = JSON.stringify(req.body.jsn);
      mysqlConnection.query(
        "CALL SP_CREATE_ROLES(?,?,?);",
        [req.body.rolName, jsn, req.body.idGrade],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "ROL SAVED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Funcion para Modificar Usuarios
Roles.Update = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      const jsn = JSON.stringify(req.body.jsn);
      mysqlConnection.query(
        "CALL SP_UPDATE_ROLES(?,?,?)",
        [req.body.rolName, jsn, req.body.idGrade],
        (err, rows, fields) => {
          if (err) next(newError(err, 400));
          res.status(200).send({ status: "ROL UPDATED" });
        }
      );
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Roles;
