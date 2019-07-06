/* Modelos de validación de los endpoints de BoatDocuments */
const BoatDocumentsSchema = {};

/* Params -> GetBoatDocuments */
BoatDocumentsSchema.ParamsGetBoatDocuments = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    }
  }
};

/* Params -> PutBoatDocuments */
BoatDocumentsSchema.ParamsPutBoatDocuments = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    }
  }
};

BoatDocumentsSchema.ParamsPutBoatDocumentsByType = {
  type: "object",
  required: ["id", "name", "typeid"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    typeid: {
      type: "string"
    }
  }
};

module.exports = BoatDocumentsSchema;
