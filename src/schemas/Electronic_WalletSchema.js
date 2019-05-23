const Electronic_WalletSchema = {};

Electronic_WalletSchema.erase = {
  type: "object",
  required: ["electronic_wallet_id"],
  properties: {
    electronic_wallet_id: {
      type: "number"
    }
  }
};

Electronic_WalletSchema.delete = {
  type: "object",
  required: ["electronic_wallet_id", "logical_deleted"],
  properties: {
    electronic_wallet_id: {
      type: "number"
    },
    logical_deleted: {
      type: "number"
    }
  }
};

Electronic_WalletSchema.create = {
  type: "object",
  required: ["marina_amount", "logical_deleted"],
  properties: {
    marina_amount: {
      type: "number"
    },
    logical_deleted: {
      type: "number"
    }
  }
};

Electronic_WalletSchema.update = {
  type: "object",
  required: ["electronic_wallet_id"],
  properties: {
    electronic_wallet_id: {
      type: "number"
    },
    ...Electronic_WalletSchema.create.properties
  }
};

module.exports = Electronic_WalletSchema;
