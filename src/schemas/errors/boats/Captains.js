const Responsible = {};

let message = "";
let code = 400;
let sqlError = null;

Responsible.GetCaptain = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe.";
      break;
    case 45001:
      message = "El bote no existe.";
      break;
    case 45002:
      message = "No existe ese bote relacionado con ese cliente.";
      break;
    default:
      message =
        "Novocore falló en la obtención del capitán. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Responsible.PutCaptain = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe.";
      break;
    case 45001:
      message = "El bote no existe.";
      break;
    case 45002:
      message = "No existe ese bote relacionado con ese cliente.";
      break;
    default:
      message = "Novocore falló al insertar el capitán. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Responsible.DeleteCaptain = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe.";
      break;
    case 45001:
      message = "El bote no existe.";
      break;
    case 45002:
      message = "No existe ese bote relacionado con ese cliente.";
      break;
    default:
      message = "Novocore falló al eliminar el capitán. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = Responsible;
