// SlipsOccupation - Controller
const SlipsOccupation = {};

/* Trae la lista de ocupaciones de slip */
SlipsOccupation.GetSlipsOccupation = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      // recibe un rango de fechas de estadía, el tamaño del barco, el número de la cotización

      // algoritmo para cálculo de disponibilidad de estadía

      // "disponibilidad entera": slips que posea la mayor ocupación para el barco

      // busca el slip mas cercano disponible
      // guarda la cantidad de dias disponibles totales válidos para las fechas de estadía dadas
      // compara con todos los slips buscando alguno que cumpla con una mejor "disponibilidad entera"
      // si no encuentra ninguno, se queda con la disponibilidad inicial obtenida.

      // si no encuentra espacio en ningún slip, ni de un dia, retorna indisponibilidad.

      // si quedan días de ocupación por asignar, repite el proceso.

      // cada vuelta equivale a un row dentro de la tabla, dado que se hará en slips diferentes la ocupación.
      // en ese caso se considera que el barco estará en varios slips diferentes durante su estadía.

      // si un barco grande no encuentra ocupación suficiente en los slips de su tamaño, manda a llamar al
      // algoritmo "multisplips" para calcular ocupación ocupando varios slips al mismo tiempo.

      // si falla, retorna indisponibilidad.

      res.status(200).send("GetSlipOccupations");
    } catch (error) {
      console.log(error);
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

module.exports = SlipsOccupation;
