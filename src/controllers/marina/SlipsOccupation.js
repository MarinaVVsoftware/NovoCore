const OccupationAvailability = require("../../helpers/occupationAlgorithms/OccupationAvailability");

// SlipsOccupation - Controller
const SlipsOccupation = {};

/* Trae la lista de ocupaciones de slip */
SlipsOccupation.GetSlipsOccupation = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_SlipsOccupation_GetSlipsOccupation();")
        .then(result => {
          /* Convierte las fechas de mysql a javascript datetime */
          slipsOccupation = result[0][0];

          res.status(200).send({ slipsOccupation: slipsOccupation });
        })
        .catch(error => next(newError(error, 400)));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

/* Trae la lista de ocupaciones de slip de una cotización */
SlipsOccupation.GetSlipsOccupationByQuotation = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      res.status(200).send("GetSlipsOccupationByQuotation");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

/* Inserta una nueva ocupación de slip */
SlipsOccupation.PostSlipsOccupation = (
  host,
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      Promises = [
        fetch(host + "/api/marina/slip-types/"),
        fetch(host + "/api/marina/slips/"),
        fetch(host + "/api/marina/slips-occupation/")
      ];

      Promise.all(Promises)
        .then(response => Promise.all(response.map(res => res.json())))
        .then(result => {
          let occupation = OccupationAvailability(
            result[0].slipTypes,
            result[1].slips,
            result[2].slipsOccupation,
            req.body.startDate,
            req.body.endDate,
            req.body.loa,
            req.body.quotationId
          );

          res.status(200).send({ occupation });
        })
        .catch(error => next(newError(error, 400)));
    } catch (error) {
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
      next(newError(error, 500));
    }
  };
};

module.exports = SlipsOccupation;
