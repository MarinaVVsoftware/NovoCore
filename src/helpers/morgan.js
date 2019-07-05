const morgan = require("morgan");

module.exports = app => {
  // crea el token "timestamp" para morgan
  morgan.token("timestamp", () => {
    let d = new Date();
    let timestamp =
      d.getUTCFullYear() +
      "/" +
      ("0" + (d.getUTCMonth() + 1)).slice(-2) +
      "/" +
      ("0" + d.getUTCDate()).slice(-2) +
      " " +
      ("0" + d.getUTCHours()).slice(-2) +
      ":" +
      ("0" + d.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + d.getUTCSeconds()).slice(-2);

    return timestamp;
  });

  // añade un log personalizado de morgan con datetime
  app.use(
    morgan(
      "[:timestamp] :status - :method :url - :response-time ms - :res[content-length]"
    )
  );
};
