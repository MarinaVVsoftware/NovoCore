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
  let fragments = [];
  let longerFragment = null;
  let slipValid = null;
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
    return { slipValid, error };
  }

  /* Reduce la cantidad de slips en el array a solo los del tipo de slip */
  var slipsReduced = slips.filter(slip => {
    if (slip.slip_type_id == slipType) return slip;
  });

  var slipsReduced = slipsReduced.slice(0, 7);

  /* Reduce la cantidad de ocupaciones en el array a solo los del tipo de slip*/
  var slipsOccupationReduced = slipsOccupation.filter(slipOccupation => {
    if (slipOccupation.slip_type_id == slipType) return slipOccupation;
  });

  /* busca el slip mas cercano disponible, que cumpla con la mejor "disponibilidad entera".
  Si no hay ocupaciones después de generar los filtros, lo inserta en el primer 
  slip disponible, de lo contrario tendrá que buscar alguno disponible. */
  if (slipsOccupationReduced.length > 0)
    /* Itera cada slip posible en el que el barco puede quedarse */
    for (let s = 0; s < slipsReduced.length; s++) {
      /* Obtiene todas las ocupaciones de ese slip */
      var occupationBySlip = slipsOccupationReduced.filter(occup => {
        if (slipsReduced[s].slip_id == occup.slip_id) return occup;
      });

      if (occupationBySlip.length > 0) {
        // create all fragments
      } else {
        slipValid = slipsReduced[s].slip_name;
        break;
      }
    }
  else {
    slipValid = slipsReduced[0].slip_name;
  }

  if (slipValid === null)
    error = "No se encontró ninguna disponibilidad entera.";

  return {
    slipValid,
    error,
    fragments,
    slipsReduced,
    slipsOccupationReduced
  };
};

/**
 *
 * @param {Date} S QuotationStartDate
 * @param {Date} E QuotationEndDate
 * @param {array} occupationsBySlip arreglo de ocupaciones del slip
 * @param {string} slip nombre del slip que se está iterando
 * @param {array} fragments contenedor de intervalos de tiempo
 */
function CalculateFragments(S, E, occupationsBySlip, slip, fragments) {
  let n = occupationsBySlip.length; //cantidad de ocupaciones del slip
  let days = null;

  /* tipos de intervalos */

  // S <=> A : antes de la ocupación
  // B <=> E : después de la ocupación

  occupationsBySlip.forEach((occupation, index) => {
    let A = occupation.start_date;
    let B = occupation.end_date;

    if (S < A) {
      if (S > B) {
        /* caso especial, donde existe un intervalo antes de una ocupación */
        days = FormatDatetime.TimeBetweenTwoDates(S, A);
        fragments.push({
          slip: slip,
          startDate: S,
          endDate: A,
          days: days
        });
      }
    } else {
      /* si no es menor, es porque es una ocupación cuyo startDate (A)
      se encuentra después de S. Aquí empiezan los intervalos normales. */

      /* en el último caso, dado que no habrán más ocupaciones, el último fragmento
      usa una fórmula diferente, donde F= B, E */
      if (index < occupation.length) {
        // casos normales, con formula normal
        // si no hay dias entre ocupaciones, no se crea el fragmento
      } else {
        // ultimo caso, con formula especial
      }
    }
  });

  // primero hay que encontrar el caso especial, donde existe un intervalo antes
  // de la primera ocupación. Si startDate es menor que la 1ra ocupación, existe el intervalo.
  if (S < occupationsBySlip[0].start_date) {
    days = FormatDatetime.TimeBetweenTwoDates(S, endDate);
    fragments.push({
      slip: slip,
      startDate: S,
      endDate: occupationsBySlip[0].start_date,
      days: fragment
    });
  }
}

/** Calcula los intervalos de tiempo en los que el barco
 * podría quedarse porque están desocupados.
 *
 * @param {Date} S QuotationStartDate
 * @param {Date} E QuotationEndDate
 * @param {Date} A OccupationStartDate
 * @param {Date} B OccupationEndDate
 * @param {array} fragments contenedor de intervalos de tiempo
 */
function GetDateFragments(S, E, A, B, fragments, slip) {
  // Si llega después
  if (S >= A) {
    if (E >= B) {
      // y se va después (3)
      // obtengo la dif entre E y B
      fragments = CreateFragment(B, E, fragments, slip);
    }
    // else = y se va antes (2)
  } else {
    // si llega antes
    // y se va despues (1)
    if (E >= B) {
      // y se va antes (4)
      // obtengo la dif entre A y S
      fragments = CreateFragment(S, A, fragments, slip);
      // obtengo la dif entre E y B
      fragments = CreateFragment(B, E, fragments, slip);
    } else {
      // obtengo la dif entre A y S
      fragments = CreateFragment(S, A, fragments, slip);
    }

    // si llega antes y se va después no hay intervalos disponibles.
  }
  return fragments;
}

function CreateFragment(startDate, endDate, fragments, slip) {
  fragment = FormatDatetime.TimeBetweenTwoDates(startDate, endDate);

  fragments.push({
    slip: slip,
    startDate: startDate,
    endDate: endDate,
    days: fragment
  });

  return fragments;
}
