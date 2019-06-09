const Electronic_Wallet_HistoricSchema = {};

Electronic_Wallet_HistoricSchema.erase = {
  type: "object",
  required: ["electronic_W_H_id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

Electronic_Wallet_HistoricSchema.create = {
  type: "object",
  required: [
    "client_id",
    "creation_date",
    "alter_responsable",
    "descripcion",
    "previous_amount",
    "new_amount"
  ],
  properties: {
    client_id: {
      type: "number"
    },
    creation_date: {
      type: "string"
    },
    alter_responsable: {
      type: "string"
    },
    descripcion: {
      type: "string"
    },
    previous_amount: {
      type: "number"
    },
    new_amount: {
      type: "number"
    }
  }
};

Electronic_Wallet_HistoricSchema.update = {
  type: "object",
  required: ["electronic_W_H_id"],
  properties: {
    electronic_W_H_id: {
      type: "number"
    },
    ...Electronic_Wallet_HistoricSchema.create.properties
  }
};

module.exports = Electronic_Wallet_HistoricSchema;
