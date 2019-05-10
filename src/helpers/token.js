const jwt = require('jsonwebtoken');

function validateToken(header) {
	var hola = false;
	const token = header;
	if (!token) return false;

	const token2 = token.replace('Bearer', '');
	return jwt.verify(token2, 'Secret Password', function(err, user) {
		if (err) {
			return hola;
		} else {
			return !hola;
		}
		//return false;
	});
}

module.exports = validateToken;
