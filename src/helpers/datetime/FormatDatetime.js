/** Convierte una fecha en formato legible para el humano
 */
module.exports = function FormatDatetime(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
