const Roles = {};

Roles.GetRoles = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      Query(mysqlConnection, "CALL SP_Roles_GetRoles();")
        .then(result => {
          res.status(200).send({ roles: result[0][0] });
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

Roles.PutRolByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre del rol es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));

      Query(mysqlConnection, "CALL SP_Roles_PutRolByName (?,?,?,?);", [
        decodeURIComponent(req.params.name),
        req.body.rank_id,
        req.body.rol_name,
        req.body.permissions
      ])
        .then(result => {
          res.status(200).send({
            status: "El rol se ha insertado o modificado correctamente."
          });
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

Roles.DeleteRolByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      res.status(200).send(JSON.stringify("DeleteRolByName"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Roles;
