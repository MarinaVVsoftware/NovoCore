const BankAccounts = {};

BankAccounts.ParamsGetBankAccounts = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

BankAccounts.ParamsPutBankAccount = {
  type: "object",
  required: ["id", "number"],
  properties: {
    id: {
      type: "string"
    },
    number: {
      type: "string"
    }
  }
};

BankAccounts.BodyPutBankAccount = {
  type: "object",
  required: ["bankAccount"],
  properties: {
    bankAccount: {
      type: "object",
      required: ["alias", "bank", "accountNumber", "clabe"],
      properties: {
        alias: {
          type: "string"
        },
        bank: {
          type: "string"
        },
        accountNumber: {
          type: "string"
        },
        clabe: {
          type: "string"
        }
      }
    }
  }
};

BankAccounts.ParamsDeleteBankAccount = {
  type: "object",
  required: ["id", "number"],
  properties: {
    id: {
      type: "string"
    },
    number: {
      type: "string"
    }
  }
};

module.exports = BankAccounts;
