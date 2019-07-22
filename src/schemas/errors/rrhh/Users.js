const Users = {};

let message = "";
let code = 400;
let sqlError = null;

Users.GetUserByEmail = {
  GetUser: error => {
    switch (parseInt(error.sqlState)) {
      case 45000:
        message = "El usuario no existe. Inserte un email de usuario válido.";
        break;
      default:
        message =
          "Novocore falló en la obtención del usuario. Contacte con soporte.";
        sqlError = error.message;
        break;
    }
    return [message, code, sqlError];
  },
  GetRol: error => {
    switch (parseInt(error.sqlState)) {
      case 45000:
        message = "El rol no existe. Seleccione un rol válido.";
        break;
      default:
        message =
          "Novocore falló en la obtención del usuario. Contacte con soporte.";
        sqlError = error.message;
        break;
    }
    return [message, code, sqlError];
  }
};

Users.PutUserByName = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El rol no existe. No se pudo crear al usuario.";
      break;
    case 45001:
      message = "El status no existe. No se pudo crear al usuario.";
      break;
    default:
      message =
        "Novocore falló en la creación del usuario. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

Users.DeleteUserByName = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El usuario no existe. Inserte un email de usuario válido.";
      break;
    default:
      message = "Novocore falló al eliminar el usuario. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = Users;
