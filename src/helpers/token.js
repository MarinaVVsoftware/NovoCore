const jwt = require("jsonwebtoken");
const Token = {};
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(path.join(__dirname, "./keys/public.key"), "utf8");

// Toma el header y decodifica el token para ver si existe.
Token.validateToken = (header) => {
	var isSuccess = false;
	const token = header;
	if (!token) return isSuccess;

	// Quita la palabra "Bearer" propia de JWT
	const tokenFormatted = token.replace("Bearer", "");
	// Verifica el token
	return jwt.verify(
		tokenFormatted,
		publicKey,
		{
			expiresIn: "4d"
		},
		function (err, user) {
			return err ? isSuccess : !isSuccess;
		}
	);
};

// Recibe el header "authorization" y lo valida con la función "validateToken"
Token.auth = () => {
	return (req, res, next) => {
		if (!Token.validateToken(req.headers["authorization"])) {
			res.status(401).send({ error: "Error de autorización token inválido." });
		} else {
			//Utiliza la función de middleware propio de express
			next();
		}
	};
};

module.exports = Token;
