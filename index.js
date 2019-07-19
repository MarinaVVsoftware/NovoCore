const path = require("path");
const Log = require(path.resolve(__dirname, "./src/helpers/Logs"));
const config = require(path.resolve(__dirname, "./src/server/config"));

// Se pasa como parámetro la instancia de express al módulo de config
const { app, vars } = config();

// Inicia el servidor si la configuración se ejecutó correctamente
if (app) {
  app.listen(vars.port, function() {
    Log.Success("API inicializó exitosamente.");
    Log.Success("Server escuchando en: " + vars.host);
  });
}
