const dotenv = require("dotenv").config();

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
module.exports = {
  env: {
    local: {
      host: process.env.LOCAL_HOST,
      port: process.env.LOCAL_PORT,
      authcore: process.env.LOCAL_AUTHCORE_HOST
    },
    dev: {
      host: process.env.DEV_HOST,
      port: process.env.DEV_PORT,
      authcore: process.env.DEV_AUTHCORE_HOST
    },
    prod: {
      host: process.env.PROD_HOST,
      port: process.env.PROD_PORT,
      authcore: process.env.PROD_AUTHCORE_HOST
    },
    NODE_ENV: process.env.NODE_ENV
  },
  redis: {
    local: {
      host: process.env.REDIS_LOCAL_HOST,
      port: process.env.REDIS_LOCAL_PORT,
      db: process.env.REDIS_LOCAL_DB,
      password: process.env.REDIS_LOCAL_PASSWORD,
      debug: process.env.REDIS_LOCAL_DEBUG_MODE,
      flush: process.env.REDIS_LOCAL_FLUSH_ON_START
    },
    dev: {
      host: process.env.REDIS_DEV_HOST,
      port: process.env.REDIS_DEV_PORT,
      db: process.env.REDIS_DEV_DB,
      password: process.env.REDIS_DEV_PASSWORD,
      debug: process.env.REDIS_DEV_DEBUG_MODE,
      flush: process.env.REDIS_DEV_FLUSH_ON_START
    },
    prod: {
      host: process.env.REDIS_PROD_HOST,
      port: process.env.REDIS_PROD_PORT,
      db: process.env.REDIS_PROD_DB,
      password: process.env.REDIS_PROD_PASSWORD,
      debug: process.env.REDIS_PROD_DEBUG_MODE,
      flush: process.env.REDIS_PROD_FLUSH_ON_START
    }
  },
  mysql: {
    local: {
      host: process.env.DB_LOCAL_HOST,
      port: process.env.DB_LOCAL_PORT,
      localAddress: process.env.DB_LOCAL_LOCAL_ADDRESS,
      user: process.env.DB_LOCAL_USER,
      password: process.env.DB_LOCAL_PASS,
      database: process.env.DB_LOCAL_NAME,
      debugMode: process.env.MYSQL_LOCAL_DEBUG_MODE
    },
    dev: {
      host: process.env.DB_DEV_HOST,
      port: process.env.DB_DEV_PORT,
      localAddress: process.env.DB_DEV_LOCAL_ADDRESS,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS,
      database: process.env.DB_DEV_NAME,
      debugMode: process.env.MYSQL_DEV_DEBUG_MODE
    },
    prod: {
      host: process.env.DB_PROD_HOST,
      port: process.env.DB_PROD_PORT,
      localAddress: process.env.DB_PROD_LOCAL_ADDRESS,
      user: process.env.DB_PROD_USER,
      password: process.env.DB_PROD_PASS,
      database: process.env.DB_PROD_NAME,
      debugMode: process.env.MYSQL_PORD_DEBUG_MODE
    }
  },
  dropbox: {
    key: process.env.DROPBOX_KEY
  }
};
