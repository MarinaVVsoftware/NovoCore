const MarinaServices = {};

MarinaServices.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

MarinaServices.create = {
  type: "object",
  required: ["name", "price"],
  properties: {
    name: {
      type: "string"
    },
    price: {
      type: "number"
    }
  }
};

MarinaServices.update = {
  type: "object",
  required: ["marinaServiceId"],
  properties: {
    MarinaServiceId: {
      type: "number"
    },
    ...MarinaServices.create.properties
  }
};

module.exports = MarinaServices;
