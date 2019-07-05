const morgan = require("morgan");

module.exports = app => {
  // crea el token "timestamp" para morgan
  morgan.token("timestamp", () => {
    let d = new Date().toLocaleString("en-US", {
      timeZone: "America/Cancun"
    });
    d = new Date(d);
    let timestamp =
      d.getFullYear() +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + d.getDate()).slice(-2) +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2) +
      ":" +
      ("0" + d.getSeconds()).slice(-2);

    return timestamp;
  });

  /* Añade la información del error si hubo alguno */
  morgan.token("error", (req, res) => {
    /* Evita errores en express, en caso que no venga un error */
    if (res.error) {
      /* Construye el string del error */
      let stack = res.error.stack.replace(/(\r\n|\n|\r)/gm, "");
      return "| StackError[" + stack + "]";
    } else return "";
  });

  // añade un log personalizado de morgan con datetime
  app.use(
    morgan(
      "[:timestamp] :status - :method :url - :response-time ms - :res[content-length] :error"
    )
  );
};
