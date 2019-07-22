const Roles = {};

let message = "";
let code = 400;
let sqlError = null;

Roles.PutRolByName = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "La jerarquía no existe. Seleccione una jerarquía válida.";
      break;
    default:
      message = "Novocore falló al crear el rol. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Roles.DeleteRolByName = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El rol no existe. Contacte con soporte.";
      break;
    default:
      message = "Novocore falló al eliminar el rol. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = Roles;
