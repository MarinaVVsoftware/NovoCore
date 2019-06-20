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

Users.PutUserByName = (newError, Query, mysqlConnection, authcore) => {
  return function(req, res, next) {
    try {
      const user = req.body;

      /* Valida manualmente si el nombre de usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError('el param "name" no es un string válido.', 400));
      /* Manda una petición a AuthCore para crear un usuario */ else
        fetch(
          authcore + "/auth/users/" + encodeURIComponent(user.email) + "/",
          {
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
          }
        )
          .then(response => {
            if (response.ok) return response.json();
            else throw new Error("La API de AuthCore ha fallado.");
          })
          .then(response => {
            /* Hace PUT en DB del usuario */
            Query(mysqlConnection, "CALL SP_Users_PutByName(?,?,?,?,?,?);", [
              decodeURIComponent(req.params.name),
              user.rol_id,
              user.status_id,
              user.email,
              user.username,
              user.recruitment_date
            ])
              .then(() => {
                res.status(200).send({
                  status: "Usuario insertado o modificado correctamente."
                });
              })
              .catch(error => next(error));
          })
          .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.DeleteUserByName = (newError, Query, mysqlConnection, authcore) => {
  return function(req, res, next) {
    try {
      /* Valida manualmente si el nombre de usuario es un string alfanumérico válido.
      decodifica el string de la uri. %20 significa espacio. */
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(decodeURIComponent(req.params.email)))
        next(newError('el param "email" no es un string válido.', 400));

      console.log(decodeURIComponent(req.params.email));
      /* Manda una petición a AuthCore para crear un usuario */
      fetch(
        authcore + "/auth/users/" + decodeURIComponent(req.params.email) + "/",
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: req.get("Authorization")
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (!response.error)
            Query(mysqlConnection, "CALL SP_Users_DeleteByEmail(?);", [
              decodeURIComponent(req.params.email)
            ])
              .then(() => {
                res
                  .status(200)
                  .send({ status: "Usuario eliminado correctamente." });
              })
              .catch(error => {
                next(error);
              });
          else throw new Error(response.error);
        })
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Users;
