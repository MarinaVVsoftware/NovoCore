const ElectronicWalletHistoric = {};

let message = "";
let code = 400;
let sqlError = null;

ElectronicWalletHistoric.GetHistoric = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al obtener el historial del monedero electrónico. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = ElectronicWalletHistoric;
