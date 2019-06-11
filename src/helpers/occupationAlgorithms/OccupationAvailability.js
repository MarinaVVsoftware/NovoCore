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

  /* Reduce la cantidad de slips en el array a solo los del tipo de slip */
  var slipsReduced = slips.filter(slip => {
    if (slip.slip_type_id == slipType) return slip;
  });

  /* Reduce la cantidad de ocupaciones en el array a solo los del tipo de slip */
  var slipsOccupationReduced = slipsOccupation.filter(slipOccupation => {
    if (slipOccupation.slip_type_id == slipType) return slipOccupation;
  });

  // "disponibilidad entera": slip que posea la mayor ocupación para las fechas de esa cotización
  /* busca el slip mas cercano disponible, que cumpla con la mejor "disponibilidad entera" */
  for (let s = 0; s < slipsReduced.length; s++) {
    // hace un filter de todas las ocupaciones con ese slip.
    if (slipsOccupationReduced.length == 0) {
      console.log("te quedaste sin ocupaciones para revisar!");
      break;
    } else
      console.log("ocupaciones por revisar: " + slipsOccupationReduced.length);
    var occupationBySlip = slipsOccupationReduced.filter((occup, index) => {
      if (slipsReduced[s].slip_name == occup.slip_name) {
        slipsOccupationReduced.splice(index, 1);
        return occup;
      }
    });
    // si encuentra cero ocupaciones, entonces lo setea directamente
    if (occupationBySlip.length > 0) console.log(occupationBySlip);

    // si retorna resultados, filtra todas las ocupaciones de ese slip por coincidencia de fecha
    // si no hay ocupaciones entre las fechas de estadía, entonces lo setea directamente

    // si se cumple que hay coincidencia tanto en el slip como en fechas, calcula la mejor disponibilidad.
    // dado que no hubo disponibilidad entera, pasa al siguiente slip.
  }

  return { slipsReduced, slipsOccupationReduced };

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
