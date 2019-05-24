const newError = require("../../helpers/newError");
const Query = require("../../helpers/query");

// SocketTypes - Controller
const SocketTypes = {};

/* Trae la lista de SocketTypes */
SocketTypes.GetSocketTypes = mysqlConnection => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_SOCKET_TYPES();")
        .then(result => {
          res.status(200).send({ socketTypes: result[0][0] });
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

module.exports = SocketTypes;
