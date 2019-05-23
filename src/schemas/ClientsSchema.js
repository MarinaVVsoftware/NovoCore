const ClientsSchema = {};

ClientsSchema.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

ClientsSchema.delete = {
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

ClientsSchema.create = {
  type: "object",
  required: [
    "status_id",
    "rol_id",
    "electronic_signature_id",
    "name",
    "email",
    "phone",
    "address",
    "creation_date",
    "electronic_wallet_id"
  ],
  properties: {
    status_id: {
      type: "number"
    },
    rol_id: {
      type: "number"
    },
    electronic_signature_id: {
      type: "number"
    },
    name: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    address: {
      type: "string"
    },
    creation_date: {
      type: "string"
    },
    electronic_wallet_id: {
      type: "number"
    }
  }
};

ClientsSchema.update = {
  type: "object",
  required: ["client_id"],
  properties: {
    client_id: {
      type: "number"
    },
    ...ClientsSchema.create.properties
  }
};

module.exports = ClientsSchema;
