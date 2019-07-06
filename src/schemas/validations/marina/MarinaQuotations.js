const MarinaQuotations = {};

MarinaQuotations.read = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      pattern: "^[0-9]*$"
    }
  }
};

MarinaQuotations.readList = {
  type: "object",
  required: ["filterBy"],
  properties: {
    filterBy: {
      type: "string",
      enum: ["active", "draft", "cancelled", "deleted", "finished", "inactive"]
    }
  }
};

MarinaQuotations.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

MarinaQuotations.delete = {
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

MarinaQuotations.create = {
  type: "object",
  required: [
    "boatId",
    "quotationStatusId",
    "mooringTariffId",
    "arrivalDate",
    "departureDate",
    "arrivalStatus",
    "mooringTariff",
    "loa",
    "daysStay",
    "discountStayPercentage",
    "currencyAmount",
    "tax",
    "subtotal",
    "total",
    "monthlyQuotation",
    "annualQuotation",
    "semiannualQuotation",
    "creationResponsable"
  ],
  properties: {
    boatId: {
      type: "number"
    },
    quotationStatusId: {
      type: "number"
    },
    mooringTariffId: {
      type: "number"
    },
    arrivalDate: {
      type: "string"
    },
    departureDate: {
      type: "string"
    },
    arrivalStatus: {
      type: "boolean"
    },
    mooringTariff: {
      type: "number"
    },
    loa: {
      type: "number"
    },
    daysStay: {
      type: "number"
    },
    discountStayPercentage: {
      type: "number"
    },
    currencyAmount: {
      type: "number"
    },
    tax: {
      type: "number"
    },
    subtotal: {
      type: "number"
    },
    total: {
      type: "number"
    },
    monthlyQuotation: {
      type: "boolean"
    },
    annualQuotation: {
      type: "boolean"
    },
    semiannualQuotation: {
      type: "boolean"
    },
    creationResponsable: {
      type: "string"
    },
    electricityTariff: {
      type: "number"
    },
    totalElectricityDays: {
      type: "number"
    },
    discountElectricityPercentage: {
      type: "number"
    },
    currencyElectricityAmount: {
      type: "number"
    },
    electricityTax: {
      type: "number"
    },
    electricitySubtotal: {
      type: "number"
    },
    electricityTotal: {
      type: "number"
    }
  }
};

MarinaQuotations.update = {
  type: "object",
  required: ["quotationId"],
  properties: {
    quotationId: {
      type: "number"
    },
    ...MarinaQuotations.create.properties
  }
};

module.exports = MarinaQuotations;
