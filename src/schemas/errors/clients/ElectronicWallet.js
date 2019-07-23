const ElectronicWallet = {};

let message = "";
let code = 400;
let sqlError = null;

ElectronicWallet.GetElectronicWallet = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al obtener el monedero electrónico. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

ElectronicWallet.PutElectronicWallet = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    case 45001:
      message =
        "El monedero ya existe, no puede ser creado de nuevo. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al crear el monedero electrónico. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

ElectronicWallet.PatchMarinaAmount = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al actualizar el monedero electrónico. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = ElectronicWallet;
