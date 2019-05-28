/* Schemas de validación de los endpoints de Captains */
const CaptainsSchema = {};

/* Params -> GetCaptain */
CaptainsSchema.ParamsGetCaptain = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Params -> PutCaptain */
CaptainsSchema.ParamsPutCaptain = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Body -> PutCaptain */
CaptainsSchema.BodyPutCaptain = {
  type: "object",
  required: ["captain"],
  properties: {
    captain: {
      type: "object",
      required: [
        "name",
        "phone",
        "email",
        "paymentPermission",
        "aceptationPermission"
      ],
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
        paymentPermission: {
          type: "boolean"
        },
        aceptationPermission: {
          type: "boolean"
        }
      }
    }
  }
};
/* Params -> DeleteCaptain */
CaptainsSchema.ParamsDeleteCaptain = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

module.exports = CaptainsSchema;
