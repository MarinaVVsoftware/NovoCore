const Incidents = {};

let message = "";
let code = 400;
let sqlError = null;

Incidents.GetIncidentsByUser = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El usuario no existe. Contacte a soporte.";
      break;
    default:
      message =
        "Novocore falló al obtener los incidentes. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Incidents.PostIncidentByUser = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El usuario no existe. Seleccione un usuario válido.";
      break;
    case 45001:
      message =
        "El tipo de incidente no existe. Seleccione un tipo de incidente válido.";
      break;
    default:
      message = "Novocore falló al crear el incidente. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Incidents.PutIncidentByUser = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El incidente no existe. Seleccione un incidente válido.";
      break;
    case 45001:
      message = "El usuario no existe. Seleccione un usuario válido.";
      break;
    case 45002:
      message =
        "El tipo de incidente no existe. Seleccione un tipo de incidente válido.";
      break;
    case 45003:
      message =
        "El usuario no está relacionado con el incidente. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al actualizar el incidente. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Incidents.DeleteIncidentByUser = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El usuario no existe. Seleccione un usuario válido.";
      break;
    case 45001:
      message = "El incidente no existe. Contacte con soporte.";
      break;
    case 45002:
      message =
        "El usuario no está relacionado con el incidente. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al eliminar el incidente. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = Incidents;
