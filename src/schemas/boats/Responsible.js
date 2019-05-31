/* Schemas de validación de los endpoints de Responsible */
const ResponsibleSchema = {};

/* Params -> GetResponsable */
ResponsibleSchema.ParamsGetResponsable = {
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

/* Params -> PutResponsable */
ResponsibleSchema.ParamsPutResponsable = {
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

/* Body -> PutResponsable */
ResponsibleSchema.BodyPostResponsable = {
  type: "object",
  required: ["responsable"],
  properties: {
    responsable: {
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
/* Params -> DeleteResponsable */
ResponsibleSchema.ParamsDeleteResponsable = {
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

module.exports = ResponsibleSchema;
