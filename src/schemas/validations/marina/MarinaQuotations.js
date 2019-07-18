const MarinaQuotations = {};

MarinaQuotations.ParamsGetQuotationById = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      pattern: "^[0-9]*$"
    }
  }
};

MarinaQuotations.QueryGetQuotationsByGroup = {
  type: "object",
  required: ["filterBy"],
  properties: {
    filterBy: {
      type: "string",
      enum: ["active", "draft", "cancelled", "deleted", "finished", "inactive"]
    }
  }
};

MarinaQuotations.BodyPostQuotation = {
  type: "object",
  required: ["marinaQuotation"],
  properties: {
    marinaQuotation: {
      type: "object",
      required: [
        "boatId",
        "marinaQuotationStatusId",
        "marinaMooringTariffId",
        "arrivalDate",
        "departureDate",
        "mooringTariff",
        "loa",
        "daysStay",
        "discountStayPercentage",
        "currencyAmount",
        "tax",
        "subtotal",
        "total",
        "creationResponsable"
      ],
      properties: {
        boatId: {
          type: "number"
        },
        marinaQuotationStatusId: {
          type: "number"
        },
        marinaMooringTariffId: {
          type: "number"
        },
        arrivalDate: {
          type: "string"
        },
        departureDate: {
          type: "string"
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
        semiannualQuotation: {
          type: "boolean"
        },
        annualQuotation: {
          type: "boolean"
        },
        groupQuotation: {
          type: ["number", "null"]
        },
        creationResponsable: {
          type: "string"
        }
      }
    }
  }
};

module.exports = MarinaQuotations;
