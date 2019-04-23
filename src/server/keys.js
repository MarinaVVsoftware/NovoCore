const dotenv = require("dotenv").config();
console.log(process.env);

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
module.exports = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    localAddress: process.env.DB_LOCAL_ADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },

  database_local: {
    host: process.env.DB_LOCAL_HOST,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASS,
    database: process.env.DB_LOCAL_NAME
  }
};
