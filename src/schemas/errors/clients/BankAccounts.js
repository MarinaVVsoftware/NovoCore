const BankAccounts = {};

let message = "";
let code = 400;
let sqlError = null;

BankAccounts.GetBankAccounts = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    default:
      message =
        "Novocore falló al obtener las cuentas bancarias. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

BankAccounts.PutBankAccount = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    case 45001:
      message =
        "El cliente no está relacionado con esa cuenta bancaria. Solicitud rechazada.";
      break;
    default:
      message =
        "Novocore falló crear o actualizar la cuenta bancaria. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

BankAccounts.DeleteBankAccount = error => {
  switch (parseInt(error.sqlState)) {
    case 45000:
      message = "El cliente no existe. Contacte con soporte.";
      break;
    case 45001:
      message = "La cuenta bancaria no existe. Contacte con soporte.";
      break;
    case 45002:
      message =
        "El cliente no está relacionado con esa cuenta bancaria. Solicitud rechazada.";
      break;
    default:
      message =
        "Novocore falló crear o actualizar la cuenta bancaria. Contacte con soporte.";
      sqlError = error.message;
      break;
  }
  return [message, code, sqlError];
};

module.exports = BankAccounts;
