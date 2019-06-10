const MarinaPayments = {};

MarinaPayments.create = {
  type: "object",
  required: [
    "paymentTypeId",
    "clientId",
    "folio",
    "currency",
    "currencyDate",
    "paymentReceived",
    "convertedAmount",
    "creationDate"
  ],
  properties: {
    paymentTypeId: {
      type: "number"
    },
    clientId: {
      type: "number"
    },
    folio: {
      type: "number"
    },
    currency: {
      type: "number"
    },
    currencyDate: {
      type: "string"
    },
    paymentReceived: {
      type: "number"
    },
    convertedAmount: {
      type: "number"
    },
    creationDate: {
      type: "string"
    }
  }
};

MarinaPayments.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

MarinaPayments.update = {
  type: "object",
  required: ["marinaPaymentId"],
  properties: {
    marinaPaymentId: {
      type: "number"
    },
    ...MarinaPayments.create.properties
  }
};

module.exports = MarinaPayments;
