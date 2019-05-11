const jwt = require('jsonwebtoken');
const Token = {};
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

Token.generateToken = (tokenData) => {
	return jwt.sign(tokenData, privateKey, {
		/*issuer: 'Marina v&v',
		subject: 'sistemas@sistemas.com',
		audience: 'novonautica.com',*/
		algorithm: 'RS256'
	});
};

Token.validateToken = (header) => {
	var isSuccess = false;
	const token = header;
	if (!token) return isSuccess;
	const tokenFormatted = token.replace('Bearer', '');
	return jwt.verify(tokenFormatted, publicKey, function(err, user) {
		return err ? isSuccess : !isSuccess;
	});
};

module.exports = Token;
