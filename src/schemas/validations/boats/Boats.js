const path = require("path");
const constants = require(path.resolve(
  __dirname,
  "../../../helpers/Constants"
));
/* Modelos de validación de los endpoints de Boats */
const Boats = {};

/* Valida los params de la url */
Boats.ParamsGetBoatsByClient = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Boats.ParamsPutBoat = {
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
Boats.BodyPutBoat = {
  type: "object",
  required: ["boat", "documents"],
  properties: {
    boat: {
      required: ["clientId", "name", "model", "loa", "draft", "beam"],
      type: "object",
      properties: {
        clientId: {
          type: "number"
        },
        name: {
          type: "string"
        },
        model: {
          type: ["string", "null"]
        },
        loa: {
          type: "number"
        },
        draft: {
          type: ["number", "null"]
        },
        beam: {
          type: ["number", "null"]
        }
      }
    },
    captain: {
      required: [
        "name",
        "phone",
        "email",
        "paymentPermission",
        "aceptationPermission"
      ],
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        phone: {
          type: ["string", "null"]
        },
        email: {
          type: ["string", "null"]
        },
        paymentPermission: {
          type: "boolean"
        },
        aceptationPermission: {
          type: "boolean"
        }
      }
    },
    responsable: {
      required: [
        "name",
        "phone",
        "email",
        "paymentPermission",
        "aceptationPermission"
      ],
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        phone: {
          type: ["string", "null"]
        },
        email: {
          type: ["string", "null"]
        },
        paymentPermission: {
          type: "boolean"
        },
        aceptationPermission: {
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
            required: ["cableTypeId", "socketTypeId"],
            type: "object",
            properties: {
              cableTypeId: {
                type: "number"
              },
              socketTypeId: {
                type: "number"
              }
            }
          }
        ]
      }
    },
    documents: {
      /* cantidad de documentos. debe ser igual a la cantidad de tipos de docs existentes */
      minItems: constants.boats.boatDocumentsLength,
      maxItems: constants.boats.boatDocumentsLength,
      type: "array",
      items: {
        allOf: [
          {
            required: ["boatDocumentTypeId", "url"],
            type: "object",
            properties: {
              boatDocumentTypeId: {
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

Boats.ParamsPatchBoat = {
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

Boats.BodyPatchBoat = {
  type: "object",
  required: ["boat"],
  properties: {
    boat: {
      required: ["name", "model", "loa", "draft", "beam"],
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        model: {
          type: ["string", "null"]
        },
        loa: {
          type: "number"
        },
        draft: {
          type: ["number", "null"]
        },
        beam: {
          type: ["number", "null"]
        }
      }
    }
  }
};

Boats.DeleteBoat = {
  type: "object",
  required: ["boatId"],
  properties: {
    boatId: {
      type: "number"
    }
  }
};

module.exports = Boats;
