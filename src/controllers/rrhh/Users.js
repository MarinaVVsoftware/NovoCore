const Users = {};

Users.GetUsers = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      Query(mysqlConnection, "CALL SP_Users_GetUsers();")
        .then(result => {
          res.status(200).send({ Users: result[0][0] });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.GetUserByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre de usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_Users_GetUserByName(?);", [
        decodeURIComponent(req.params.name)
      ])
        .then(result => {
          res.status(200).send({ User: result[0][0][0] });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.PutUserByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre de usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_Users_PutByName(?,?,?,?,?,?);", [
        decodeURIComponent(req.params.name),
        req.body.rol_id,
        req.body.status_id,
        req.body.email,
        req.body.username,
        req.body.recruitment_date
      ])
        .then(result => {
          res
            .status(200)
            .send({ status: "Usuario insertado o modificado correctamente." });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.DeleteUserByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre de usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_Users_DeleteByName(?);", [
        decodeURIComponent(req.params.name)
      ])
        .then(result => {
          res.status(200).send({ status: "Usuario eliminado correctamente." });
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Users;
