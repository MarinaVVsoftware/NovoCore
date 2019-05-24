const newError = require("../../helpers/newError");
const Query = require("../../helpers/query");

// SlipTypes - Controller
const SlipTypes = {};

SlipTypes.GetSlipTypes = mysqlConnection => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_SLIP_TYPES();")
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
