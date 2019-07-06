const MarinaQuotationServices = {};

MarinaQuotationServices.create = {
  type: "object",
  required: [
    "boatId",
    "marinaServiceId",
    "done",
    "tax",
    "total",
    "subtotal",
    "quantity",
    "creationDate"
  ],
  properties: {
    boatId: {
      type: "number"
    },
    marinaServiceId: {
      type: "number"
    },
    done: {
      type: "boolean"
    },
    tax: {
      type: "number"
    },
    total: {
      type: "number"
    },
    subtotal: {
      type: "number"
    },
    quantity: {
      type: "number"
    },
    creationDate: {
      type: "string"
    }
  }
};

MarinaQuotationServices.update = {
  type: "object",
  required: ["marinaQuotationServiceId"],
  properties: {
    marinaQuotationServiceId: {
      type: "number"
    },
    ...MarinaQuotationServices.create.properties
  }
};

MarinaQuotationServices.delete = {
  type: "object",
  required: ["marinaQuotationServiceId", "delete"],
  properties: {
    marinaQuotationServiceId: {
      type: "number"
    },
    delete: {
      type: "number"
    }
  }
};

MarinaQuotationServices.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

module.exports = MarinaQuotationServices;
