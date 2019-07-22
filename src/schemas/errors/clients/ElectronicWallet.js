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

module.exports = ElectronicWallet;
