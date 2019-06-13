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
        fragments = CalculateFragments(
          startDate,
          endDate,
          occupationBySlip,
          slipsReduced[s].slip_name,
          fragments
        );
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
  let n = occupationsBySlip.length;

  for (let o = 0; o < n; o++) {
    const occupation = occupationsBySlip[o];
    let A = occupation.start_date;
    let B = occupation.end_date;
    let BnLess = null;
    if (o > 0) BnLess = occupationsBySlip[o - 1].end_date;

    let debug = "81";

    if (occupation.slip_name == debug) console.log(o);
    if (occupation.slip_name == debug) console.log(occupation);

    if (S < A) {
      if (o == 0) {
        if (E < B) {
          fragments = CreateFragment(S, A, fragments, slip);
          if (occupation.slip_name == debug)
            console.log("CreateFragment S <=> A + break");
          break;
        } else {
          fragments = CreateFragment(S, A, fragments, slip);
          if (occupation.slip_name == debug)
            console.log("CreateFragment S <=> A");
        }
      } else {
        if (E < B) {
          if (E < A) {
            if (E > BnLess) {
              fragments = CreateFragment(BnLess, E, fragments, slip);
              if (occupation.slip_name == debug)
                console.log("CreateFragment BnLess <=> E + break");
              break;
            } else {
              if (occupation.slip_name == debug) console.log("just break?");
              break;
            }
          } else {
            if (S < BnLess) {
              fragments = CreateFragment(BnLess, A, fragments, slip);
              if (occupation.slip_name == debug)
                console.log("CreateFragment BnLess <=> A + break");
              break;
            } else {
              fragments = CreateFragment(S, A, fragments, slip);
              if (occupation.slip_name == debug)
                console.log("CreateFragment S <=> A + break");
              break;
            }
          }
        } else {
          if (S < BnLess) {
            fragments = CreateFragment(BnLess, A, fragments, slip);
            if (occupation.slip_name == debug)
              console.log("CreateFragment BnLess <=> A");
          } else {
            fragments = CreateFragment(S, A, fragments, slip);
            if (occupation.slip_name == debug)
              console.log("CreateFragment S <=> A");
          }

          if (o == n - 1) {
            fragments = CreateFragment(B, E, fragments, slip);
            if (occupation.slip_name == debug)
              console.log("CreateFragment B <=> E + break");
            break;
          }
        }
      }
    } else {
      if (occupation.slip_name == debug)
        console.log("nothing to do here. just continue.");
      continue;
    }
  }

  return fragments;
}

function CreateFragment(startDate, endDate, fragments, slip) {
  days = FormatDatetime.TimeBetweenTwoDates(startDate, endDate);

  fragments.push({
    slip: slip,
    startDate: startDate,
    endDate: endDate,
    days: days
  });

  return fragments;
}
