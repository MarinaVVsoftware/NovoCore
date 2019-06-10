const MarinaPaymentTypes = {};

MarinaPaymentTypes.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

MarinaPaymentTypes.create = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

MarinaPaymentTypes.update = {
  type: "object",
  required: ["paymentTypeId"],
  properties: {
    paymentTypeId: {
      type: "number"
    },
    ...MarinaPaymentTypes.create.properties
  }
};

module.exports = MarinaPaymentTypes;
