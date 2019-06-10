// SlipsOccupation - Controller
const SlipsOccupation = {};

/* Trae la lista de ocupaciones de slip */
SlipsOccupation.GetSlipsOccupation = (newError, Query, mysqlConnection) => {
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
SlipsOccupation.PostSlipsOccupation = (newError, Query, mysqlConnection) => {
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
SlipsOccupation.PutSlipsOccupation = (newError, Query, mysqlConnection) => {
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
SlipsOccupation.DeleteSlipsOccupation = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteSlipOccupations");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = SlipsOccupation;
