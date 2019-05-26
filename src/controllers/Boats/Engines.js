// Engines - Controller
const Engines = {};

/* Trae la lista de Slips */
Engines.GetEngines = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetEngines");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Inserta un nuevo engine asociado a un bote */
Engines.PostEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PostEngine");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Modifica un engine de un bote basado en su id natural */
Engines.PutEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutEngine");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Elimina un engine de un bote basado en su id natural */
Engines.DeleteEngine = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteEngine");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Engines;
