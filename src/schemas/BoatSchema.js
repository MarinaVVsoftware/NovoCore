/* Modelos de validación de los endpoints de Boats */
const BoatSchema = {};

/* Valida los params de la url */
BoatSchema.GetBoatsByClient = {
  type: "object",
  required: ["clientId"],
  properties: {
    clientId: {
      type: "string"
    }
  }
};

BoatSchema.PutBoat = {
  type: "object",
  required: ["clientId", "name", "model", "loa", "draft", "beam"],
  properties: {
    clientId: {
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
