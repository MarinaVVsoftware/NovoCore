/* Schemas de validación de los endpoints de SlipsOccupation */
const SlipsOccupation = {};

/* Params -> GetSlipsOccupationByQuotation */
SlipsOccupation.ParamsGetSlipsOccupationByQuotation = {
  type: "object",
  required: ["quotation"],
  properties: {
    quotation: {
      type: "string"
    }
  }
};

/* Body -> PostSlipsOccupation */
SlipsOccupation.BodyPostSlipsOccupation = {
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
SlipsOccupation.ParamsPutSlipsOccupation = {
  type: "object",
  required: ["quotation"],
  properties: {
    quotation: {
      type: "string"
    }
  }
};

/* Body -> PutSlipsOccupation */
SlipsOccupation.BodyPutSlipsOccupation = {
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

module.exports = SlipsOccupation;
