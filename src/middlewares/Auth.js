const Token = require("../helpers/token");

module.exports = app => {
  //Utiliza un middleware
  app.use(Token.auth());
};
