/* Schemas de validación de los endpoints de BoatElectricity */
const BoatElectricitySchema = {};

/* Params -> GetBoatElectricity */
BoatElectricitySchema.ParamsGetBoatElectricity = {
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

/* Params -> PostBoatElectricity */
BoatElectricitySchema.ParamsPostBoatElectricity = {
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

/* Body -> PostBoatElectricity */
BoatElectricitySchema.BodyPostBoatElectricity = {
  type: "object",
  required: ["boatElectricity"],
  properties: {
    boatElectricity: {
      type: "object",
      required: ["cableTypeId", "socketTypeId"],
      properties: {
        cableTypeId: {
          type: "number"
        },
        socketTypeId: {
          type: "number"
        }
      }
    }
  }
};

/* Params -> PutBoatElectricity */
BoatElectricitySchema.ParamsPutBoatElectricity = {
  type: "object",
  required: ["id", "name", "electricityid"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    electricityid: {
      type: "string"
    }
  }
};

/* Body -> PutBoatElectricity */
BoatElectricitySchema.BodyPutBoatElectricity = {
  type: "object",
  required: ["boatElectricity"],
  properties: {
    boatElectricity: {
      type: "object",
      required: ["cableTypeId", "socketTypeId"],
      properties: {
        cableTypeId: {
          type: "number"
        },
        socketTypeId: {
          type: "number"
        }
      }
    }
  }
};

/* Params -> DeleteBoatElectricity */
BoatElectricitySchema.ParamsDeleteBoatElectricity = {
  type: "object",
  required: ["id", "name", "electricityid"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    electricityid: {
      type: "string"
    }
  }
};

module.exports = BoatElectricitySchema;
