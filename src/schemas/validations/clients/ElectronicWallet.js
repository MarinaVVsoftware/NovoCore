const ElectronicWallet = {};

ElectronicWallet.ParamsGetElectronicWallet = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

ElectronicWallet.ParamsPostElectronicWalletMovement = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

ElectronicWallet.BodyPostElectronicWalletMovement = {
  type: "object",
  required: ["electronicWalletMovement"],
  properties: {
    electronicWalletMovement: {
      type: "object",
      required: ["newAmount", "description", "alterResponsable"],
      properties: {
        newAmount: {
          type: "number"
        },
        description: {
          type: "string"
        },
        alterResponsable: {
          type: "string"
        }
      }
    }
  }
};

module.exports = ElectronicWallet;
