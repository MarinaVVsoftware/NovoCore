const path = require("path");
const newError = require(path.resolve(__dirname, "../../helpers/newError"));
const Query = require(path.resolve(__dirname, "../../helpers/query"));

// Slips - Controller
const Slips = {};

/* Trae la lista de Slips */
Slips.GetSlips = mysqlConnection => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_SLIPS();")
        .then(result => {
          res.status(200).send({ slips: result[0][0] });
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

module.exports = Slips;
