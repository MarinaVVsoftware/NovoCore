const path = require("path");
const newError = require(path.resolve(__dirname, "../../helpers/newError"));
const Query = require(path.resolve(__dirname, "../../helpers/query"));

// SlipTypes - Controller
const SlipTypes = {};

/* Trae la lista de SlipTypes */
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
