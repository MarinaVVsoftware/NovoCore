/* Schemas de validación de los endpoints de SlipsOccupation */
const SlipsOccupationSchema = {};

/* Body -> PostSlipsOccupation */
SlipsOccupationSchema.BodyPostSlipsOccupation = {
  type: "object",
  required: ["slipId", "boatId", "startDate", "endDate", "creationResponsable"],
  properties: {
    slipId: {
      type: "number"
    },
    boatId: {
      type: "number"
    },
    startDate: {
      type: "string"
    },
    endDate: {
      type: "string"
    },
    creationResponsable: {
      type: "string"
    }
  }
};

/* Params -> PutSlipsOccupation */
SlipsOccupationSchema.ParamsPutSlipsOccupation = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

/* Body -> PutSlipsOccupation */
SlipsOccupationSchema.BodyPutSlipsOccupation = {
  type: "object",
  required: [
    "slipOccupationId",
    "slipId",
    "boatId",
    "startDate",
    "endDate",
    "creationResponsable"
  ],
  properties: {
    slipOccupationId: {
      type: "number"
    },
    slipId: {
      type: "number"
    },
    boatId: {
      type: "number"
    },
    startDate: {
      type: "string"
    },
    endDate: {
      type: "string"
    },
    creationResponsable: {
      type: "string"
    }
  }
};

/* Params -> DeleteSlipsOccupation */
SlipsOccupationSchema.ParamsDeleteSlipsOccupation = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

module.exports = SlipsOccupationSchema;
