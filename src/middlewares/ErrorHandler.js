/**
 * Middleware: Error Handler
 * Middleware para manejo de errores. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.z
 */
module.exports = app => {
  app.use((error, req, res, next) => {
    try {
      let bodyErrors = [];
      let paramsErrors = [];
      let queryErrors = [];

      /* En caso que sea un error en el body del endpoint */
      if (error.validationErrors) {
        /* Mapea los errores de body */
        if (error.validationErrors.body)
          bodyErrors = error.validationErrors.body.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });
        /* Mapea los errores de params */
        if (error.validationErrors.params)
          paramsErrors = error.validationErrors.params.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });

        /* Mapea los errores de querys */
        if (error.validationErrors.query)
          queryErrors = error.validationErrors.query.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });
      }

      /* En caso que se ejecute un NewError() */
      if (error.statusCode && error.message) {
        if (error.statusCode == 500) {
          /* IMPORTANTE: morgan requiere esta línea para hacer print del error */
          res.error = error;
          res.status(error.statusCode).send({ error: error.stack });
        } else {
          /* Se puede enviar el error sql dentro del objeto newError,
          de lo contrario se imprime el mensaje de error con morgan */
          res.error = error.error ? error.error : error.message;
          res.status(error.statusCode).send({ error: error.message });
        }
      } else if (error.validationErrors) {
        /* Si son errores de Schemas, pasa por aquí */
        res.status(406).send({
          error: {
            bodyErrors: bodyErrors,
            paramsErrors: paramsErrors,
            queryErrors: queryErrors
          }
        });
      } else {
        res.error = error;
        /* En caso que no se especifique el error */
        res.status(400).send({ error: error });
      }
    } catch (error) {
      res.error = error;
      res.status(500).send({ error: "El validador ha fallado: " + error });
    }
  });
};
