/* Modelos de validación de los endpoints de Boats */
const BoatSchema = {};

/* Valida los params de la url */
BoatSchema.ParamsGetBoatsByClient = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
BoatSchema.ParamsPutBoat = {
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

/* Schema para el body de "PutBoat" */
BoatSchema.BodyPutBoat = {
  type: "object",
  required: ["boat", "documents"],
  properties: {
    boat: {
      required: ["client_id", "name", "model", "loa", "draft", "beam"],
      type: "object",
      properties: {
        client_id: {
          type: "number"
        },
        name: {
          type: "string"
        },
        model: {
          type: "string"
        },
        loa: {
          type: "number"
        },
        draft: {
          type: "number"
        },
        beam: {
          type: "number"
        }
      }
    },
    captain: {
      required: [
        "name",
        "phone",
        "email",
        "payment_permission",
        "aceptation_permission"
      ],
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        email: {
          type: "string"
        },
        payment_permission: {
          type: "boolean"
        },
        aceptation_permission: {
          type: "boolean"
        }
      }
    },
    responsable: {
      required: [
        "name",
        "phone",
        "email",
        "payment_permission",
        "aceptation_permission"
      ],
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        email: {
          type: "string"
        },
        payment_permission: {
          type: "boolean"
        },
        aceptation_permission: {
          type: "boolean"
        }
      }
    },
    engines: {
      type: "array",
      items: {
        allOf: [
          {
            required: ["model", "brand"],
            type: "object",
            properties: {
              model: {
                type: "string"
              },
              brand: {
                type: "string"
              }
            }
          }
        ]
      }
    },
    electricity: {
      type: "array",
      items: {
        allOf: [
          {
            required: ["cable_type_id", "socket_type_id"],
            type: "object",
            properties: {
              cable_type_id: {
                type: "number"
              },
              socket_type_id: {
                type: "number"
              }
            }
          }
        ]
      }
    },
    documents: {
      /* cantidad de documentos. debe ser igual a la cantidad de tipos  de docs existentes */
      minItems: 5,
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
                type: "string"
              }
            }
          }
        ]
      }
    }
  }
};

BoatSchema.DeleteBoat = {
  type: "object",
  required: ["boatId"],
  properties: {
    boatId: {
      type: "number"
    }
  }
};

module.exports = BoatSchema;
