const Clients = {};

Clients.ParamsGetClientById = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

Clients.BodyPostClient = {
  type: "object",
  required: ["client"],
  properties: {
    client: {
      type: "object",
      required: ["statusId", "name", "email", "phone", "address"],
      properties: {
        status_id: {
          type: "number"
        },
        name: {
          type: "string"
        },
        email: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        address: {
          type: "string"
        },
        bankAccounts: {
          minItems: 1,
          type: "array",
          items: {
            allOf: [
              {
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
            ]
          }
        }
      }
    }
  }
};

Clients.ParamsPutClient = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

Clients.BodyPutClient = {
  type: "object",
  required: ["client"],
  properties: {
    client: {
      type: "object",
      required: ["statusId", "name", "email", "phone", "address"],
      properties: {
        status_id: {
          type: "number"
        },
        name: {
          type: "string"
        },
        email: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        address: {
          type: "string"
        }
      }
    }
  }
};

Clients.ParamsDeleteClientById = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

module.exports = Clients;
