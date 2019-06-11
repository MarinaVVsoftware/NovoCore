/** Convierte una fecha en formato legible para el humano
 */

class FormatDatetime {
  HumanFormat(date) {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  GetMonthBetweenTwoDates(a, b) {
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
  }
}

module.exports = FormatDatetime;
