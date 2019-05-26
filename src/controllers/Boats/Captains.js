// Captains - Controller
const Captains = {};

/* Trae el capitan de un bote */
Captains.GetCaptain = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetCaptain");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Modifica un capitan de un bote basado en su id natural */
Captains.PutCaptain = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutCaptain");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Elimina un capitan de un bote basado en su id natural */
Captains.DeleteCaptain = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteCaptain");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Captains;
