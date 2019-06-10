/* Modelos de validación de los endpoints de BoatDocuments */
const QuotationTimelineSchema = {};

/* Params -> GetBoatDocuments */
QuotationTimelineSchema.ParamsGetTimelineByQuotation = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

module.exports = QuotationTimelineSchema;
