const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Marina - Controller
const Boats = {};

Boats.GetBoatsByClient = mysqlConnection => {
  console.log("dentro del método");
  return (req, res, next) => {
    try {
      res.status(200).send(JSON.stringify(req.params.clientId));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Boats.PutBoat = mysqlConnection => {
  return (req, res, next) => {
    try {
      res.status(200).send(JSON.stringify("PutBoat"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Boats.DeleteBoat = mysqlConnection => {
  return (req, res, next) => {
    try {
      res.status(200).send(JSON.stringify("DeleteBoat"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Boats;
