/* Modelos de validación de los endpoints de BoatDocuments */
const MarinaQuotationServices = {};

/* Params -> GetBoatDocuments */
MarinaQuotationServices.BodyPostMarinaQuotationService = {
  type: "object",
  required: ["marinaQuotationService"],
  properties: {
    marinaQuotationService: {
      type: "object",
      required: [
        "boatId",
        "marinaQuotationServiceTypeId",
        "quantity",
        "subtotal",
        "tax",
        "total"
      ],
      properties: {
        boatId: {
          type: "number"
        },
        marinaQuotationServiceTypeId: {
          type: "number"
        },
        quantity: {
          type: "number"
        },
        subtotal: {
          type: "number"
        },
        tax: {
          type: "number"
        },
        total: {
          type: "number"
        }
      }
    }
  }
};

module.exports = MarinaQuotationServices;
