// SlipTypes - Controller
const SlipTypes = {};

/* Trae la lista de SlipTypes */
SlipTypes.GetSlipTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_SlipTypes_GetSlipTypes();")
        .then(result => {
          res.status(200).send({ slipTypes: result[0][0] });
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

module.exports = SlipTypes;
