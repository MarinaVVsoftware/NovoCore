const dotenv = require("dotenv").config();

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
module.exports = {
  database: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_USER,
    DB_NAME: process.env.DB_USER
  }
};
