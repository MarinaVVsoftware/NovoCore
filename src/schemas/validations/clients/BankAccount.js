const Bank_AccountSchema = {};

Bank_AccountSchema.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

Bank_AccountSchema.delete = {
  type: "object",
  required: ["id", "delete"],
  properties: {
    id: {
      type: "number"
    },
    delete: {
      type: "number"
    }
  }
};

Bank_AccountSchema.create = {
  type: "object",
  required: [
    "client_id",
    "alias",
    "bank",
    "account_number",
    "clabe",
    "status_id"
  ],
  properties: {
    client_id: {
      type: "number"
    },
    alias: {
      type: "string"
    },
    bank: {
      type: "string"
    },
    account_number: {
      type: "string"
    },
    clabe: {
      type: "string"
    },
    status_id: {
      type: "number"
    }
  }
};

Bank_AccountSchema.update = {
  type: "object",
  required: ["bank_account_id"],
  properties: {
    bank_account_id: {
      type: "number"
    },
    ...Bank_AccountSchema.create.properties
  }
};

module.exports = Bank_AccountSchema;
