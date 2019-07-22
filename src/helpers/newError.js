/**
 * Importar la función y ejecutarlo dentro de next()
 * @param {string} errorMessage Mensaje de error
 * @param {number} statusCode Código de error
 */
function newError(errorMessage, statusCode, error) {
  const err = new Error(
    errorMessage &&
    (typeof errorMessage === "string" || typeof errorMessage === "object")
      ? errorMessage
      : "Ops! Something went wrong"
  );
  err.statusCode = statusCode ? statusCode : 400;
  err.error = error ? error : null;
  return err;
}

module.exports = newError;
