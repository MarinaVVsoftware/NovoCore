/* Schemas de validación de los endpoints de BoatElectricity */
const BoatElectricitySchema = {};

/* Params -> GetBoatElectricity */
BoatElectricitySchema.ParamsGetBoatElectricity = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Params -> PostBoatElectricity */
BoatElectricitySchema.ParamsPostBoatElectricity = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Body -> PostBoatElectricity */
BoatElectricitySchema.BodyPostBoatElectricity = {
  type: "object",
  required: ["boatName", "cableTypeId", "SocketTypeId"],
  properties: {
    boatName: {
      type: "string"
    },
    cableTypeId: {
      type: "number"
    },
    SocketTypeId: {
      type: "number"
    }
  }
};

/* Params -> PutBoatElectricity */
BoatElectricitySchema.ParamsPutBoatElectricity = {
  type: "object",
  required: ["name", "id"],
  properties: {
    name: {
      type: "string"
    },
    id: {
      type: "string"
    }
  }
};

/* Body -> PutBoatElectricity */
BoatElectricitySchema.BodyPutBoatElectricity = {
  type: "object",
  required: ["boatName", "cableTypeId", "SocketTypeId"],
  properties: {
    boatName: {
      type: "string"
    },
    cableTypeId: {
      type: "number"
    },
    SocketTypeId: {
      type: "number"
    }
  }
};

/* Params -> DeleteBoatElectricity */
BoatElectricitySchema.ParamsDeleteBoatElectricity = {
  type: "object",
  required: ["name", "id"],
  properties: {
    name: {
      type: "string"
    },
    id: {
      type: "string"
    }
  }
};

module.exports = BoatElectricitySchema;
