const FormatDatetime = require("../datetime/FormatDatetime");

/** OccupationAvailability: Algoritmo para calcular la disponibilidad de ocupación en el puerto
 * dado un rango de fechas y un tamaño de barco.
 */

module.exports = function OccupationAvailability(
  slipTypes,
  slips,
  slipsOccupation,
  startDate,
  endDate,
  loa,
  quotationId
) {
  let occupation = [];
  let slipType = null;
  let error = null;

  /* Con la lista de slipTypes obtenidos de la DB, busca en que tipo de slip
  encaja el barco que va a ser colocado en el puerto */
  for (let type = 0; type < slipTypes.length; type++) {
    if (
      loa >= slipTypes[type].slip_min_ft &&
      loa <= slipTypes[type].slip_max_ft
    ) {
      slipType = slipTypes[type].slip_type_id;
      break;
    }
  }

  /* Valida que se haya asignado el tipo de slip */
  if (!slipType) {
    error =
      "El tamaño del barco no corresponde con los tipos de slips disponibles. Rangos entre 1ft y 120ft.";
    return { occupation, error };
  }

  // "disponibilidad entera": slip que posea la mayor ocupación para las fechas de esa cotización
  /* busca el slip mas cercano disponible, que cumpla con la mejor "disponibilidad entera" */

  for (let s = 0; s < slips.length; s++) {
    /* Si el slip no es del tipo correcto, no lo usa */
    if (s.slip_type_id != slipType) continue;
    else {
    }
  }

  return { occupation, error };

  // /* algoritmo para cálculo de disponibilidad de estadía */

  // // recibe un rango de fechas de estadía, el tamaño del barco, el número de la cotización
  // // "disponibilidad entera": slips que posea la mayor ocupación para el barco

  // // busca el slip mas cercano disponible
  //   // guarda la cantidad de dias disponibles totales válidos para las fechas de estadía dadas
  //   // compara con todos los slips buscando alguno que cumpla con una mejor "disponibilidad entera"

  //   // si no encuentra ninguno, se queda con la disponibilidad inicial obtenida.
  //   // si no encuentra espacio en ningún slip, ni de un dia, retorna indisponibilidad.

  //   // si quedan días de ocupación por asignar, repite el proceso.

  // // cada vuelta equivale a un row dentro de la tabla, dado que se hará en slips diferentes la ocupación.
  // // en ese caso se considera que el barco estará en varios slips diferentes durante su estadía.

  // // si un barco grande no encuentra ocupación suficiente en los slips de su tamaño, manda a llamar al
  // // algoritmo "multisplips" para calcular ocupación ocupando varios slips al mismo tiempo.

  //   // si falla, retorna indisponibilidad.
};
