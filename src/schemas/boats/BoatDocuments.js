const path = require("path");
const constants = require(path.resolve(__dirname, "../../helpers/Constants"));
/* Modelos de validación de los endpoints de BoatDocuments */
const BoatDocumentsSchema = {};

/* Params -> GetBoatDocuments */
BoatDocumentsSchema.ParamsGetBoatDocuments = {
  type: "object",
  required: ["name"],
  properties: {
    id: {
      type: "string"
    }
  }
};

/* Params -> PutBoat Documents */
BoatDocumentsSchema.ParamsPutBoatDocuments = {
  type: "object",
  required: ["name"],
  properties: {
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
  required: ["name", "typeid"],
  properties: {
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
      required: ["boat_document_type_id", "url"],
      properties: {
        boat_document_type_id: {
          type: "number"
        },
        url: {
          type: "string"
        }
      }
    }
  }
};

module.exports = BoatDocumentsSchema;
