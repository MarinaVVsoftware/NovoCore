const Clients = {};

let message = "";
let code = 400;
let sqlError = null;

Clients.GetClientById = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message = "Novocore falló al obtener el cliente. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Clients.PostClient = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente ya existe. Utilice un email diferente.";
      break;
    case 45001:
      message = "El status no existe. Seleccione un status válido.";
      break;
    default:
      message = "Novocore falló al crear el cliente. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Clients.DeleteClientById = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message = "Novocore falló al eliminar el cliente. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = Clients;
