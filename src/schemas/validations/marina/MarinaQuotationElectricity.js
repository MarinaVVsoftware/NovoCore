const Electricity = {};

Electricity.ParamsGetElectricity = {
  type: "object",
  required: ["quotation"],
  properties: {
    quotation: {
      type: "string"
    }
  }
};

Electricity.ParamsPutElectricity = {
  type: "object",
  required: ["quotation"],
  properties: {
    quotation: {
      type: "string"
    }
  }
};

Electricity.BodyPutElectricity = {
  type: "object",
  required: ["marinaQuotationElectricity"],
  properties: {
    marinaQuotationElectricity: {
      type: "object",
      required: [
        "electricityTariff",
        "totalDays",
        "discountElectricityPercentage",
        "currencyAmount",
        "tax",
        "subtotal",
        "total"
      ],
      properties: {
        electricityTariff: {
          type: "number"
        },
        totalDays: {
          type: "number"
        },
        discountElectricityPercentage: {
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
        }
      }
    }
  }
};

module.exports = Electricity;
