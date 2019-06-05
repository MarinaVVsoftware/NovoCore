const dotenv = require("dotenv").config();

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
module.exports = {
  env: {
    local: {
      host: process.env.LOCAL_HOST,
      port: process.env.LOCAL_PORT
    },
    dev: {
      host: process.env.DEV_HOST,
      port: process.env.DEV_PORT
    },
    prod: {
      host: process.env.PROD_HOST,
      port: process.env.PROD_PORT
    },
    NODE_ENV: process.env.NODE_ENV
  },
  redis: {
    local: {
      host: process.env.REDIS_LOCAL_HOST,
      port: process.env.REDIS_LOCAL_PORT,
      db: process.env.REDIS_LOCAL_DB,
      password: process.env.REDIS_LOCAL_PASSWORD
    },
    dev: {
      host: process.env.REDIS_DEV_HOST,
      port: process.env.REDIS_DEV_PORT,
      db: process.env.REDIS_DEV_DB,
      password: process.env.REDIS_DEV_PASSWORD
    },
    prod: {
      host: process.env.REDIS_PROD_HOST,
      port: process.env.REDIS_PROD_PORT,
      db: process.env.REDIS_PROD_DB,
      password: process.env.REDIS_PROD_PASSWORD
    }
  },
  mysql: {
    local: {
      host: process.env.DB_LOCAL_HOST,
      port: process.env.DB_LOCAL_PORT,
      localAddress: process.env.DB_LOCAL_LOCAL_ADDRESS,
      user: process.env.DB_LOCAL_USER,
      password: process.env.DB_LOCAL_PASS,
      database: process.env.DB_LOCAL_NAME
    },
    dev: {
      host: process.env.DB_DEV_HOST,
      port: process.env.DB_DEV_PORT,
      localAddress: process.env.DB_DEV_LOCAL_ADDRESS,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS,
      database: process.env.DB_DEV_NAME
    },
    prod: {
      host: process.env.DB_PROD_HOST,
      port: process.env.DB_PROD_PORT,
      localAddress: process.env.DB_PROD_LOCAL_ADDRESS,
      user: process.env.DB_PROD_USER,
      password: process.env.DB_PROD_PASS,
      database: process.env.DB_PROD_NAME
    }
  },
  dropbox: {
    key: process.env.DROPBOX_KEY
  }
};
