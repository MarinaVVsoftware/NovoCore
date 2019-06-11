/** Algoritmo para calcular la disponibilidad de ocupación en el puerto
 * dado un rango de fechas y un tamaño de barco.
 */
module.exports = function OccupationAvailability(
  startDate,
  endDate,
  loa,
  quotationId,
  slipTypes
) {
  let slipsOccupation = [];
  let slipType = null;
  let error = null;

  switch (loa) {
    case loa >= 1 || loa <= 46:
      slipType = 1;
      break;
    case loa >= 47 || loa <= 61:
      slipType = 1;
      break;
    case loa >= 62 || loa <= 72:
      slipType = 1;
      break;
    case loa >= 73 || loa <= 120:
      slipType = 1;
      break;

    default:
      error =
        "El tamaño del barco no corresponde con los tipos de slips disponibles. Rangos entre 1ft y 120ft.";
      break;
  }

  /* Valida que se haya asignado el tipo de slip */
  if (error != null) return { slipsOccupation, error };

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
};
