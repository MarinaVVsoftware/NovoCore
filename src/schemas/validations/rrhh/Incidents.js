/* Modelos de validación de los endpoints de Incidents */
const Incidents = {};

/* Valida los params de la url */
Incidents.ParamsGetIncidentsByUser = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Incidents.ParamsPostIncidentByUser = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Incidents.BodyPostIncidentByUser = {
  type: "object",
  required: ["incident"],
  properties: {
    indicent: {
      type: "object",
      required: ["incidentTypeId", "title", "description"],
      properties: {
        incidentTypeId: {
          type: "number"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        }
      }
    }
  }
};

/* Valida los params de la url */
Incidents.ParamsPutIncidentByUser = {
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

/* Valida los params de la url */
Incidents.BodyPutIncidentByUser = {
  type: "object",
  required: ["incident"],
  properties: {
    indicent: {
      type: "object",
      required: ["incidentTypeId", "title", "description"],
      properties: {
        incidentTypeId: {
          type: "number"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        }
      }
    }
  }
};

/* Valida los params de la url */
Incidents.ParamsDeleteIncidentByUser = {
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

module.exports = Incidents;
