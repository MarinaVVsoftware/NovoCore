const Users = {};

Users.GetUsers = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Users_GetUsers();")
        .then(result => res.status(200).send({ users: result[0][0] }))
        .catch(error => next(newError(error.message, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Users.GetUserByEmail = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regexEmail.test(decodeURIComponent(req.params.email)))
        next(newError("el param 'email' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Users_GetUserByEmail(?);", [
          decodeURIComponent(req.params.email)
        ])
          .then(result => {
            let user = result[0][0][0];

            Query(mysqlConnection, "CALL SP_Roles_GetRolByUser(?);", [
              user.rolId
            ])
              .then(rol => {
                user.rol = rol[0][0][0];
                res.status(200).send({ user: user });
              })
              .catch(error => next(newError(error.message, 400)));
          })
          .catch(error => next(newError(error.message, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Users.PutUserByName = (newError, Query, mysqlConnection, authcore) => {
  return (req, res, next) => {
    try {
      const user = req.body.user;

      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else {
        /* Manda una petición a AuthCore para crear un usuario */
        fetch(authcore + "/auth/users/" + user.email + "/", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: req.get("Authorization")
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            displayName: user.username,
            username: user.username
          })
        })
          .then(response => response.json())
          .then(response => {
            /* Revisa si Authcore arrojó algún error */
            if (!response.error)
              /* Hace PUT en la DB del usuario */
              Query(mysqlConnection, "CALL SP_Users_PutByName(?,?,?,?,?,?);", [
                decodeURIComponent(req.params.name),
                user.rolId,
                user.statusId,
                user.email,
                user.username,
                user.recruitmentDate
              ])
                .then(() => res.status(201).send())
                .catch(error => {
                  let message = "";
                  let code = 400;
                  switch (parseInt(error.sqlState)) {
                    case 45000:
                      message =
                        "El rol no existe. No se pudo crear al usuario.";
                      break;
                    case 45001:
                      message =
                        "El status no existe. No se pudo crear al usuario.";
                      break;
                    default:
                      message =
                        "Novocore falló en la creación del usuario. Contacte con soporte.";
                      code = 500;
                      break;
                  }
                  next(newError(message, code));
                });
            else next(newError(response.error, 400));
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Users.DeleteUserByName = (newError, Query, mysqlConnection, authcore) => {
  return (req, res, next) => {
    try {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(decodeURIComponent(req.params.email)))
        next(newError("el param 'email' no es un string válido.", 406));
      else {
        /* Manda una petición a AuthCore para crear un usuario */
        fetch(
          authcore +
            "/auth/users/" +
            decodeURIComponent(req.params.email) +
            "/",
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              authorization: req.get("Authorization")
            }
          }
        )
          .then(response => response.json())
          .then(response => {
            /* Si AuthCore no trajo errores, hace el delete en la DB */
            if (!response.error)
              Query(mysqlConnection, "CALL SP_Users_DeleteByEmail(?);", [
                decodeURIComponent(req.params.email)
              ])
                .then(() => res.status(204).send())
                .catch(error => next(newError(error.message, 400)));
            else next(newError(response.error, 400));
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Users;
