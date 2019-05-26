// Responsible - Controller
const Responsible = {};

/* Trae el responsable de un bote */
Responsible.GetResponsable = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetResponsable");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Modifica un responsable de un bote basado en su id natural */
Responsible.PutResponsable = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutResponsable");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Elimina un responsable de un bote basado en su id natural */
Responsible.DeleteResponsable = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteResponsable");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Responsible;
