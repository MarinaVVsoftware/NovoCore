/* Schemas de validación de los endpoints de MarinaMooringTariff */
const MarinaMooringTariff = {};

MarinaMooringTariff.BodyPostTariff = {
  type: "object",
  required: ["marinaMooringTariff"],
  properties: {
    marinaMooringTariff: {
      type: "object",
      required: [
        "marinaMooringTariffTypeId",
        "name",
        "description",
        "ftMin",
        "ftMax",
        "price",
        "isConditional",
        "creationResponsable"
      ],
      properties: {
        marinaMooringTariffTypeId: {
          type: "number"
        },
        name: {
          type: "string"
        },
        description: {
          type: "string"
        },
        ftMin: {
          type: "number"
        },
        ftMax: {
          type: "number"
        },
        price: {
          type: "number"
        },
        isConditional: {
          type: "boolean"
        },
        creationResponsable: {
          type: "string"
        }
      }
    }
  }
};

MarinaMooringTariff.ParamsPutTariff = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

MarinaMooringTariff.BodyPutTariff = {
  type: "object",
  required: ["marinaMooringTariff"],
  properties: {
    marinaMooringTariff: {
      type: "object",
      required: [
        "marinaMooringTariffTypeId",
        "name",
        "description",
        "ftMin",
        "ftMax",
        "price",
        "isConditional"
      ],
      properties: {
        marinaMooringTariffTypeId: {
          type: "number"
        },
        name: {
          type: "string"
        },
        description: {
          type: "string"
        },
        ftMin: {
          type: "number"
        },
        ftMax: {
          type: "number"
        },
        price: {
          type: "number"
        },
        isConditional: {
          type: "boolean"
        }
      }
    }
  }
};

MarinaMooringTariff.ParamsDeleteTariff = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

module.exports = MarinaMooringTariff;
