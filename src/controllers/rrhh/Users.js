const Users = {};

Users.GetUsers = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Users_GetUsers();")
        .then(result => {
          res.status(200);
          res.json({ users: result[0][0] });
          res.body = { users: result[0][0] };
          next();
        })
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Users.GetUserByName = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_Users_GetUserByName(?);", [
          decodeURIComponent(req.params.name)
        ])
          .then(result => {
            res.status(200);
            res.json({ user: result[0][0][0] });
            next();
          })
          .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Users.PutUserByName = (newError, Query, mysqlConnection, authcore) => {
  return (req, res, next) => {
    try {
      const user = req.body;

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
                .then(() => {
                  res.status(204);
                  next();
                })
                .catch(error => next(newError(error, 400)));
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
                .then(() => {
                  res.status(204);
                  next();
                })
                .catch(error => next(newError(error, 400)));
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
