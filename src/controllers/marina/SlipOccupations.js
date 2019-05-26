// SlipOccupations - Controller
const SlipOccupations = {};

/* Trae la lista de ocupaciones de slip */
SlipOccupations.GetSlipOccupations = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetSlipOccupations");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Inserta una nueva ocupación de slip */
SlipOccupations.PostSlipOccupations = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PostSlipOccupations");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Modifica una ocupación de slip basado en su id natural */
SlipOccupations.PutSlipOccupations = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutSlipOccupations");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Elimina una ocupación de slip basado en su id natural */
SlipOccupations.DeleteSlipOccupations = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteSlipOccupations");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = SlipOccupations;
