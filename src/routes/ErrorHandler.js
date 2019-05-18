/** Middleware: Error Handler
 * Middleware para manejo de errores. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.z
 */
module.exports = app => {
  app.use((err, req, res, next) => {
    try {
      let bodyErrors = [];
      let queryErrors = [];
      /* En caso que sea un error en el body del endpoint */
      if (err.validationErrors) {
        /* Mapea los errores de body */
        if (err.validationErrors.body)
          bodyErrors = err.validationErrors.body.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });
        /* Mapea los errores de query params */
        if (err.validationErrors.query)
          queryErrors = err.validationErrors.query.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });
      }

      /* En caso que se ejecute un NewError() */
      console.log(err);
      if (err.statusCode && err.message) {
        res.status(err.statusCode).send(err.message);
      } else if (err.validationErrors) {
        res
          .status(400)
          .send({ bodyErrors: bodyErrors, queryErrors: queryErrors });
      } else {
        /* En caso que no se especifique el error */
        res.status(400).send("Something Went Wrong!");
      }
    } catch (error) {
      res.status(500).send("El validador ha fallado: " + error);
    }
  });
};
