// Slips - Controller
const Slips = {};

/* Trae la lista de Slips */
Slips.GetSlips = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_Slips_GetSlips();")
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
