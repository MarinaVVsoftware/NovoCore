/* Schemas de validación de los endpoints de Engines */
const EnginesSchema = {};

/* Params -> GetEngines */
EnginesSchema.ParamsGetEngines = {
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

/* Params -> PostEngine */
EnginesSchema.ParamsPostEngine = {
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

/* Body -> PostEngine */
EnginesSchema.BodyPostEngine = {
  type: "object",
  required: ["engine"],
  properties: {
    engine: {
      type: "object",
      required: ["model", "brand"],
      properties: {
        model: {
          type: "string"
        },
        brand: {
          type: "string"
        }
      }
    }
  }
};

/* Params -> PutEngine */
EnginesSchema.ParamsPutEngine = {
  type: "object",
  required: ["id", "name", "engineid"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    engineid: {
      type: "string"
    }
  }
};

/* Body -> PutEngine */
EnginesSchema.BodyPutEngine = {
  type: "object",
  required: ["engine"],
  properties: {
    engine: {
      type: "object",
      required: ["model", "brand"],
      properties: {
        model: {
          type: "string"
        },
        brand: {
          type: "string"
        }
      }
    }
  }
};

/* Params -> DeleteEngine */
EnginesSchema.ParamsDeleteEngine = {
  type: "object",
  required: ["id", "name", "engineid"],
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    engineid: {
      type: "string"
    }
  }
};

module.exports = EnginesSchema;
