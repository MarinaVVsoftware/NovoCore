/* Schemas de validación de los endpoints de Engines */
const EnginesSchema = {};

/* Params -> GetEngines */
EnginesSchema.ParamsGetEngines = {
  type: "object",
  required: ["name"],
  properties: {
    id: {
      type: "string"
    }
  }
};

/* Params -> PostEngine */
EnginesSchema.ParamsPostEngine = {
  type: "object",
  required: ["name"],
  properties: {
    id: {
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

module.exports = EnginesSchema;
