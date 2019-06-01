// CableTypes - Controller
const CableTypes = {};

/* Trae la lista de CableTypes */
CableTypes.GetCableTypes = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_CABLE_TYPES();")
        .then(result => {
          res.status(200).send({ cableTypes: result[0][0] });
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

module.exports = CableTypes;
