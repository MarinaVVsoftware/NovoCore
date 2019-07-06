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
