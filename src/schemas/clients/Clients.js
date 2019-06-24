const Clients = {};

Clients.BodyPostClient = {
  type: "object",
  required: ["status_id", "name", "email", "phone", "address"],
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
};

module.exports = Clients;
