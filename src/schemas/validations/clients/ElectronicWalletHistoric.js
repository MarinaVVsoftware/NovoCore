const ElectronicWalletHistoric = {};

ElectronicWalletHistoric.ParamsGetHistoric = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

module.exports = ElectronicWalletHistoric;
