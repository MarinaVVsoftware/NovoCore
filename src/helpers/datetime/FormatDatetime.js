/** Convierte una fecha en formato legible para el humano
 */

const FormatDatetime = {};

FormatDatetime.HumanFormat = function(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

FormatDatetime.GetMonthBetweenTwoDates = function(a, b) {
  let year1 = a.getFullYear();
  let year2 = b.getFullYear();
  let month1 = a.getMonth();
  let month2 = b.getMonth();
  if (month1 === 0) {
    month1++;
    month2++;
  }
  let months = (year2 - year1) * 12 + (month2 - month1) - 1;
  return months + 1;
};

/** Calcula los días entre una fecha y otra.
 * @param {Date} startDate startDate
 * @param {Date} endDate endDate
 */
FormatDatetime.TimeBetweenTwoDates = function(startDate, endDate) {
  const A = new Date(startDate);
  const B = new Date(endDate);

  if (A > B) {
    let days = (A.getTime() - B.getTime()) / 1000 / 60 / 60 / 24;
    return days + 1;
  } else {
    let days = (B.getTime() - A.getTime()) / 1000 / 60 / 60 / 24;
    return days + 1;
  }
};

module.exports = FormatDatetime;
