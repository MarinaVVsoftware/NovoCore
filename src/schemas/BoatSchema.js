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
BoatSchema.sd = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "string"
    }
  }
};

BoatSchema.BodyPutBoat = {
  type: "object",
  required: ["boat", "engines", "electricity", "documents"],
  properties: {
    boat: {
      type: "object"
    },
    engines: {
      type: "object"
    },
    electricity: {
      type: "object"
    },
    documents: {
      type: "object"
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
