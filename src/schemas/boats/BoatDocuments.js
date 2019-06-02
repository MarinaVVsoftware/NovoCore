const path = require("path");
const constants = require(path.resolve(__dirname, "../../helpers/Constants"));
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

BoatDocumentsSchema.BodyPutBoatDocuments = {
  type: "object",
  required: ["documents"],
  properties: {
    documents: {
      /* cantidad de documentos. debe ser igual a la cantidad de tipos de docs existentes */
      minItems: constants.boats.boatDocumentsLength,
      maxItems: constants.boats.boatDocumentsLength,
      type: "array",
      items: {
        allOf: [
          {
            required: ["boat_document_type_id", "url"],
            type: "object",
            properties: {
              boat_document_type_id: {
                type: "number"
              },
              url: {
                type: ["string", "null"]
              }
            }
          }
        ]
      }
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

BoatDocumentsSchema.BodyPutBoatDocumentsByType = {
  type: "object",
  required: ["document"],
  properties: {
    document: {
      type: "object",
      required: ["url"],
      properties: {
        url: {
          type: "string"
        }
      }
    }
  }
};

module.exports = BoatDocumentsSchema;
