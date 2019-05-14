/**
 * Importar la función y ejecutarlo dentro de next()
 * @param {string} errorMessage Mensaje de error
 * @param {number} statusCode Código de error
 */
function newError(errorMessage, statusCode) {
	const err = new Error(errorMessage ? errorMessage : 'Ops! Something went wrong');
	err.statusCode = statusCode ? statusCode : 500;
	console.log(err);
	return err;
}

module.exports = newError;
