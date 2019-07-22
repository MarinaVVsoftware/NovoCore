const Roles = {};

Roles.GetRoles = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Roles_GetRoles();")
        .then(result => res.status(200).send({ roles: result[0][0] }))
        .catch(error => next(newError(error.message, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Roles.PutRolByName = (newError, Query, mysqlConnection, ErrorSchema) => {
  return (req, res, next) => {
    try {
      const rol = req.body.rol;

      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Roles_PutRolByName (?,?,?,?);", [
          decodeURIComponent(req.params.name),
          rol.rankId,
          rol.rolName,
          JSON.stringify(rol.permissions)
        ])
          .then(() => res.status(201).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Roles.DeleteRolByName = (newError, Query, mysqlConnection, ErrorSchema) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Roles_DeleteByName(?);", [
        req.params.name
      ])
        .then(() => res.status(204).send())
        .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Roles;
