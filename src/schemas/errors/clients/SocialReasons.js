const SocialReasons = {};

let message = "";
let code = 400;
let sqlError = null;

SocialReasons.GetSocialReasons = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al obtener las razones sociales. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

SocialReasons.PutSocialReason = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al crear o actualizar la razón social. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

SocialReasons.GetSocialReasons = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    case 45001:
      message = "La razón social no existe. Inserte un RFC válido.";
      break;
    default:
      message =
        "Novocore falló al eliminar la razón social. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = SocialReasons;
