const Token = require('../helpers/Token');

module.exports = (app) => {
	//Utiliza un middleware
	app.use(Token.auth());
};
