// Engines - Controller
const BoatElectricity = {};

/* Trae la lista de Slips */
BoatElectricity.GetBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetBoatElectricity");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Inserta un nuevo engine asociado a un bote */
BoatElectricity.PostBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PostBoatElectricity");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Modifica un engine de un bote basado en su id natural */
BoatElectricity.PutBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("PutBoatElectricity");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/* Elimina un engine de un bote basado en su id natural */
BoatElectricity.DeleteBoatElectricity = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.status(200).send("DeleteBoatElectricity");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = BoatElectricity;
